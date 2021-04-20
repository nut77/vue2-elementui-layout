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
const COMPONENT_EMPTY_PATH = '@l/WrapperEmpty.vue';
function getMenuConfig(index, name, path, componentPath = COMPONENT_EMPTY_PATH, config = {}, children = []) {
  componentPath = '/pages/home/Index.vue';
  const component = resolve => require([`@${componentPath}`], resolve);
  const menuItemConfig = {
    name,
    path,
    component,
    // component: () => Promise.resolve(require(`${componentPath}`).default),  component: resolve => require([`${componentPath}`], resolve),
    children: [],
    meta: Object.assign({
      index,
      hasWrapperTop: false,
      hasWrapperLeft: false,
      isNav: true,
      iconClass: ''
    }, config)
  };
  if (config.redirect) menuItemConfig.redirect = config.redirect;
  for (const item of children) {
    menuItemConfig.children.push(getMenuConfig(...item));
  }
  return menuItemConfig;
}

const routes = [
  getMenuConfig(1, '登录', '/login', '@p/login/Index.vue', {isNav: false}),
  getMenuConfig(1, '加载页', '/loading', '@p/loading/Index.vue', {isNav: false}),
  getMenuConfig(1, '错误页面', '/error', '@p/error/Index.vue', {isNav: false}),
  getMenuConfig(1, '404', '/error', '@p/error/Index.vue', {isNav: false}),
  getMenuConfig(1, '订单管理', '/order', '@p/error/Index.vue', {redirect: '/order/list'}, [
    [2, '订单列表', 'list', '@p/order/list/Index.vue', {hasWrapperTop: true, hasWrapperLeft: true}],
    [2, '订单详情', 'detail/:id', '@p/order/OrderDetail.vue', {hasWrapperTop: true}],
    [2, '订单概览', 'overview', '@p/order/OrderDetail.vue', {hasWrapperTop: true, hasWrapperLeft: true}]
  ])
];

export default routes;
