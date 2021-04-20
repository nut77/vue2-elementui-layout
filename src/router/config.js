// 导航配置
const COMPONENT_EMPTY_PATH = 'WrapperEmpty.vue';
const pageIndividual = {isNav: false};
const pageDetail = {isNav: false, hasWrapperTop: true};
const hasWrapperTop = {hasWrapperTop: true};
const hasWrapper = {hasWrapperTop: true, hasWrapperLeft: true};
const MENU_LIST = [
  [1, '首页', '/home', 'home/Index.vue', hasWrapperTop],
  [1, '登录', '/login', 'login/Index.vue', pageIndividual],
  [1, '加载页', '/loading', 'loading/Index.vue', pageIndividual],
  [1, '错误页面', '/error', 'error/Index.vue', pageIndividual],
  [1, '订单管理', '/order', COMPONENT_EMPTY_PATH, {redirect: '/order/list'}, [
    [2, '订单列表', 'list', 'orderManage/list/Index.vue', hasWrapper],
    [2, '订单详情', 'detail/:id', 'orderManage/OrderDetail.vue', pageDetail],
    [2, '订单概览', 'overview', 'orderManage/Overview.vue', hasWrapper]
  ]]
];

export default MENU_LIST;
