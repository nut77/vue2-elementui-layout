import Vue from 'vue';
import Vuex from 'vuex';
// 解决刷新浏览器，数据消失问题
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

// isOnlyNavLeft、isOnlyNavTop最多只有一个为true
const state = {
  // 是否只有顶部导航
  isOnlyNavTop: false,
  // 是否只有左侧导航
  isOnlyNavLeft: false,
  userInfo: {},
  isAdmin: false,
  isRoot: false
};

const getters = {
  getUserInfo: state => state.userInfo,
  getIsAdmin: state => state.isAdmin,
  getIsRoot: state => state.isRoot
};

const mutations = {
  mutationUserInfo(state, {data}) {
    state.userInfo = data;
  },
  mutationIsAdmin(state, {data}) {
    state.isAdmin = data;
  },
  mutationIsRoot(state, {data}) {
    state.isRoot = data;
  },
  mutationResetStore(state) {
    state.userInfo = {};
    state.isAdmin = false;
    state.isRoot = false;
  }
};

const actions = {
  setUserInfo({commit}, {data}) {
    commit('mutationUserInfo', {data});
  },
  setIsAdmin({commit}, {data}) {
    commit('mutationIsAdmin', {data});
  },
  setIsRoot({commit}, {data}) {
    commit('mutationIsRoot', {data});
  },
  resetStore({commit}) {
    commit('mutationResetStore');
  }
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  getters,
  mutations,
  actions,
  modules: {}
});
