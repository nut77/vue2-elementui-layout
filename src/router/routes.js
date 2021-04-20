// 路由配置
import MENU_LIST from './config';

/**
 * 界面导航配置
 * name 导航中文名
 * path 导航对应的路径
 * redirect 非必填，重定向地址
 * componentPath 该页面对应的组件地址
 * meta-index number-导航层级，1表示一级导航，依次类推
 * meta-hasWrapperTop boolean-表示该页面是否具有顶部模块
 * meta-hasWrapperLeft boolean-表示该页面是否具有左侧模块
 * meta-iconClass 表示该导航模块应用的css-class,
 * meta-isNav 是否是导航
 */
const COMPONENT_EMPTY_PATH = 'WrapperEmpty.vue';
function getMenuItemConfig(index, name, path, componentPath, config = {}, children = []) {
  const menuItemConfig = {
    name,
    path,
    component: loadComponent(componentPath || COMPONENT_EMPTY_PATH),
    meta: Object.assign({
      index,
      hasWrapperTop: false,
      hasWrapperLeft: false,
      isNav: true,
      iconClass: ''
    }, config)
  };
  if (config.redirect) menuItemConfig.redirect = config.redirect;
  if (children.length) menuItemConfig.children = [];
  for (const item of children) {
    menuItemConfig.children.push(getMenuItemConfig(...item));
  }
  return menuItemConfig;
}

function getRoutes() {
  const routes = [];
  for (const item of MENU_LIST) {
    routes.push(getMenuItemConfig(...item));
  }
  return routes;
}

// 处理异步加载页面组件，传递组件文件路径（必须是相对路径）。组件路径如果是字面量直接引用就行，参数的话就需要用这个方法。
function loadComponent(componentPath) {
  if (componentPath === COMPONENT_EMPTY_PATH) {
    return () => Promise.resolve(require(`@l/${componentPath}`).default);
  }
  return () => Promise.resolve(require(`@p/${componentPath}`).default);
}

export default getRoutes();
