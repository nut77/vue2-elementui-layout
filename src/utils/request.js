// 异步请求公用方法
import axios from 'axios';
import store from '../store/index';
import qs from 'qs';

// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL || '/api',
  timeout: 1000 * 60
});

// 响应异常提示
const MESSAGE = {
  NETWORK_ERR: '哎哟,出问题啦,刷新界面试试！',
  PERMISSION_DENIED: '凭证失效，请重新登录',
  TIMEOUT: '连接超时，请检查网络'
};

// 请求拦截器
axiosInstance.interceptors.request.use(config => {
  const token = store.state.userInfo.token;
  token && (config.headers.Authorization = token);
  if (config.headers['Content-Type'].includes('application/json')) {
    config.data = JSON.stringify(config.data);
  }
  if (config.headers['Content-Type'].includes('multipart/form-data')) {
    return config;
  }
  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    if (typeof (config.data) !== 'string') {
      config.data = qs.stringify(config.data);
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
axiosInstance.interceptors.response.use(response => {
  // 把axios的data层去掉原本（res.data.xx） 直接使用数据就可以res.xx即可
  return response.data;
}, error => {
  return Promise.reject(error);
});

/**
 * 构建请求参数
 * @param {Object} [options={}] - 请求参数
 * @return {Object} 返回请求配置参数
 */
const buildRequestConfig = (options = {}) => {
  const config = Object.assign({}, options);
  delete config.contentType;
  !config.headers && (config.headers = {});
  config.headers['Content-Type'] = options.contentType || 'application/json;charset=utf-8';
  // 处理文件上传参数转换
  if ((config.headers && config.headers['Content-Type'].includes('multipart/form-data')) || config.onUploadProgress) {
    const formData = new FormData();
    for (const key in options.data) {
      const files = options.data[key];
      // 判断是否是文件流
      if (!!files && files.constructor === FileList) {
        for (let i = 0; i < files.length; i++) {
          formData.append(key, files[i]);
        }
      } else {
        formData.append(key, files);
      }
    }
    config.data = formData;
  }
  return config;
};

/**
 * 利用axios发送ajax请求，并拿到响应数据
 * @param {Object} [options={}] - 请求相关配置项
 * @return {Promise} 返回请求结果
 */
const request = async (options = {}) => {
  const config = buildRequestConfig(options);
  const res = await axiosInstance(config).catch(e => {
    const isTimeout = (e.response.data && typeof e.response.data === 'string' && e.response.data.includes('ETIMEDOUT')) ||
      (e.response.status === 502);
    return {
      message: isTimeout ? MESSAGE.TIMEOUT : (e.response.data || MESSAGE.NETWORK_ERR),
      status: isTimeout ? 502 : (e.response.status || 500),
      statusText: e.response.statusText || ''
    };
  });
  if (!res) {
    return {
      message: MESSAGE.NETWORK_ERR,
      status: 500
    };
  }
  if (res.status === 401) {
    location.pathname !== '/login' && (res.message = MESSAGE.PERMISSION_DENIED);
    localStorage.clear();
    store.commit('resetUserInfo');
    location.replace('/login');
    return res;
  }
  if (res.status >= 500 && res.status !== 502) res.message = MESSAGE.NETWORK_ERR;
  return res;
};

/**
 * 封装request方法
 * @param {string} method - 请求方法
 * @param {string} url - 请求地址
 * @param {Object} [params] - 请求参数
 * @param {Object} [config] - 请求的额外配置项，如：contentType, headers, onUploadProgress等
 * @return {Promise} 返回请求结果
 */
const ajax = (method = 'get', url, params = {}, config = {}) => {
  const options = Object.assign({}, config);
  options[/get|delete/.test(method) ? 'params' : 'data'] = params;
  options.method = method;
  options.url = url;
  return request(options);
};
const get = (url, params = {}, config = {}) => ajax('get', url, params, config);
const post = (url, params = {}, config = {}) => ajax('post', url, params, config);
const del = (url, params = {}, config = {}) => ajax('delete', url, params, config);
const put = (url, params = {}, config = {}) => ajax('put', url, params, config);

export {
  ajax as all,
  request,
  get,
  post,
  del,
  put
};
