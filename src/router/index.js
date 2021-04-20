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
  if (to.matched.length === 0) {
    next('error');
    return false;
  }

  next();
});

export default router;
