import Vue from 'vue';
import App from '@l/App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI, {size: 'medium'});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
