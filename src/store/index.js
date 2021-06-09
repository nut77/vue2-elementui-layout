import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from '@/store/modules/userInfo';
// 解决刷新浏览器，数据消失问题
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const userInfoInit = {
  id: '',
  username: '',
  role: '',
  token: ''
};
const state = {
  // 是否只有顶部导航
  isOnlyNavTop: false,
  // 是否只有左侧导航
  isOnlyNavLeft: false,
  userInfo: {...userInfoInit},
  timeToGetToken: 0,
  systemInfo: {
    name: process.env.VUE_APP_SYSTEM_NAME,
    version: process.env.VUE_APP_SYSTEM_VERSION
  }
};

const getters = {
  username: state => state.userInfo.username || 'admin',
  isAdmin: state => state.userInfo.role === '管理员',
  userRole: state => state.userInfo.role || '管理员'
};

const mutations = {
  setUserInfo(state, data) {
    Object.assign(state.userInfo, data);
  },
  setToken(state, data) {
    state.userInfo.token = data;
  },
  setTimeToGetToken(state, data) {
    state.timeToGetToken = data === undefined ? Date.now() : data;
  },
  resetUserInfo(state) {
    Object.assign(state.userInfo, userInfoInit);
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()],
  state,
  getters,
  mutations,
  modules: {
    userInfo
  }
});
