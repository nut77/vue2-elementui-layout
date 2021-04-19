import Vue from 'vue';
import VueRouter from 'vue-router';
// import Empty from '@l/Empty';
import NavTop from '@l/NavTop';
import NavLeft from '@l/NavLeft';
// import Nav from '@l/Nav';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  // base: '/pro/',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/order',
      children: [
        {
          path: 'list',
          components: {
            default: () => import('@p/orderManage/List.vue'),
            left: NavLeft,
            top: NavTop
          }
        },
        {
          path: 'detail/:id',
          component: () => import('@p/orderManage/OrderDetail.vue')
        },
        {
          path: 'overview',
          component: () => import('@p/orderManage/Overview.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@p/login/Index.vue')
    },
    {
      path: '/home',
      components: () => () => import('@p/home/Index.vue'),
      meta: {
        nav: 'NavTop'
      }
    },
    {
      path: '/loading',
      component: () => import('@p/loading/Index.vue')
    },
    {
      path: '/error',
      component: () => import('@p/error/Index.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 验证是否登录
  const token = localStorage.getItem('token');
  if (to.path !== '/login' && (token === 'null' || !token)) {
    // next('login');
    next();
    return false;
  }

  // 如果token存在 访问登录页面 则跳转首页
  if (to.path === '/login' && (token !== 'null' && token)) {
    next('/home');
    return false;
  }

  if (to.matched.length === 0) {
    next('error');
    return false;
  }

  next();
});

export default router;
