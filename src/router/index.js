import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  // base: '/pro/',
  routes
});

router.beforeEach((to, from, next) => {
  // 验证是否登录
  const token = localStorage.getItem('token');
  if (to.path !== '/login' && (token === 'null' || !token)) {
    next('login');
    return false;
  }

  // 如果token存在 访问不存在的页面就跳到首页
  if (to.matched.length === 0 && (token !== 'null' && token)) {
    next('/home');
    return false;
  }

  next();
});

export default router;
