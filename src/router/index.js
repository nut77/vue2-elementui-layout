import Vue from 'vue';
import VueRouter from 'vue-router';
console.log(process.env.NODE_ENV);

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  // base: '/pro/',
  routes: [
    {
      path: '/mkt',
      component: () => import('@/views/base.vue'),
      children: [
        {
          path: 'kpi',
          component: () => import('@/views/login/index.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/index',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/loading',
      component: () => import('@/views/loading/index.vue')
    }
  ]
});

export default router;
