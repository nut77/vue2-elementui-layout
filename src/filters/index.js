import Tool from '@/utils/tool';

/**
 * 日期格式化
 * @param {string|number} val - 原始值
 * @param {string} type - 格式YYYY-MM-DD hh:mm:ss
 * @returns {string} 返回值
 */
const formatDate = (val, type) => val ? Tool.formatDate(val, type) : '-';

// 字节大小格式化
const formatByteSize = (val) => Tool.formatByteSize(val);

// 数字千分位展示
const numberWithCommas = val => Tool.numberWithCommas(val);

// 转换空字符串
const transformNull = (value, defaultString) => {
  defaultString = (defaultString || defaultString === 0) ? defaultString : '-';
  return value || value === 0 ? value : defaultString;
};

// 成功/失败
const transformStatus = (value, status) => {
  if (status === 'success') return `<span class="status-success">${value}</span>`;
  if (status === 'error') return `<span class="status-error">${value}</span>`;
  if (status === 'warning') return `<span class="status-warning">${value}</span>`;
  return value;
};

// 数组转字符串
const transformArrayToString = (val, sep = ',', emptyVal = '') => Tool.arrayToString(val, sep, emptyVal = '')

// 字符串转数组
const transformStringToArray = (value, split = '') => (value || '').split(split);

export default {
  formatDate,
  formatByteSize,
  numberWithCommas,
  transformNull,
  transformStatus,
  transformArrayToString,
  transformStringToArray
};
