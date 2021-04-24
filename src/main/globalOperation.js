// 需要全局引用的组件、过滤器、指令、混入、工具方法等
import Filters from '@/filters';
import Directives from '@/directives';
import Components from './components';
import Prototypes from './prototypes';
import Mixins from '@/mixins';

export default {
  install(Vue) {
    this.registerFilters(Vue);
    this.registerDirectives(Vue);
    this.registerPrototypes(Vue);
    this.registerComponents(Vue);
    // this.registerMixins(Vue);
  },
  // 注册过滤器
  registerFilters(Vue) {
    for (const name in Filters) {
      Vue.filter(name, Filters[name]);
    }
  },
  // 注册指令
  registerDirectives(Vue) {
    for (const name in Directives) {
      Vue.directive(name.toLowerCase(), Directives[name]);
    }
  },
  // 将方法挂载在原型上
  registerPrototypes(Vue) {
    for (const name in Prototypes) {
      Vue.prototype['$' + name] = Prototypes[name];
    }
  },
  // 注册全局组件
  registerComponents(Vue) {
    for (const name in Components) {
      // 设置组件名 组件名小写，英文单词间用短横线‘-’分隔
      const key = name.replace(/[A-Z]/g, (char, index) => {
        let res = char.toLowerCase();
        res = index > 0 ? `-${res}` : res;
        return res;
      });
      Vue.component(key, Components[name]);
    }
  },
  // 注册全局混入,所有组件（包括第三方组件）都将被影响,最好不要用
  registerMixins(Vue) {
    for (const name in Mixins) {
      Vue.mixin(Mixins[name]);
    }
  }
};
