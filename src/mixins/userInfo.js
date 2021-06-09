import {mapState, mapGetters} from 'vuex';
export default {
  computed: {
    ...mapState({
      userId: state => state.userInfo.id,
      token: state => state.userInfo.token
    }),
    ...mapGetters(['username', 'isAdmin', 'userRole'])
  },
  methods: {
    logout(msg = '凭证失效，请重新登录', type = 'error') {
      msg && this.$message[type](msg);
      this.$store.commit('resetUserInfo');
      this.$store.commit('setTimeToGetToken', 0);
      localStorage.clear();
      location.replace('/login');
    }
  }
};
