// 导航配置
const COMPONENT_EMPTY_PATH = 'WrapperEmpty.vue';
// 管理员页面配置
const pageUserAdmin = {
  authority: ['管理员']
};
// 所有用户共有的页面
const pageUserAll = {
  authority: ['管理员', '普通用户']
};
// 独立的页面基本配置
const pageIndividual = {
  isNav: false,
  hasWrapperTop: false,
  hasWrapperLeft: false,
  ...pageUserAll
};
// 详情页基本配置
const pageDetail = {
  isNav: false,
  hasWrapperLeft: false
};
// 无子菜单页面基本配置
const hasWrapperTop = {
  hasWrapperLeft: false
};
const MENU_LIST = [
  // [1, '/', '/', COMPONENT_EMPTY_PATH, Object.assign({redirect: '/home'}, pageIndividual)],
  [1, '首页', '/home', 'home/Index.vue', {...hasWrapperTop, iconClass: ''}],
  [1, '登录', '/login', 'login/Index.vue', pageIndividual],
  [1, '加载页', '/loading', 'loading/Index.vue', pageIndividual],
  [1, '错误页面', '/error', 'error/Index.vue', pageIndividual],
  [1, '订单管理', '/order', COMPONENT_EMPTY_PATH, {redirect: '/order/overview'}, [
    [2, '订单概览', 'overview', 'orderManage/Overview.vue'],
    [2, '订单列表', 'list', 'orderManage/list/Index.vue'],
    [2, '订单详情', 'detail/:id', 'orderManage/OrderDetail.vue', pageDetail]
  ]],
  [1, '物流管理', '/logistics', COMPONENT_EMPTY_PATH, {redirect: '/logistics/overview'}, [
    [2, '物流概览', 'overview', 'logisticsManage/Overview.vue'],
    [2, '物流配置', 'setting', COMPONENT_EMPTY_PATH, {redirect: '/logistics/setting/company'}, [
      [3, '物流公司', 'company', 'logisticsManage/LogisticsSetting/LogisticsCompany.vue'],
      [3, '渠道配置', 'channel', 'logisticsManage/LogisticsSetting/ChannelSetting.vue']
    ]]
  ]],
  [1, '商品管理', '/commodity', COMPONENT_EMPTY_PATH, {redirect: '/commodity/overview'}, [
    [2, '商品概览', 'overview', 'commodityManage/Overview.vue'],
    [2, '商品列表', 'list', 'commodityManage/List.vue'],
    [2, '商品详情', 'detail/:id', 'commodityManage/CommodityDetail.vue', pageDetail]
  ]],
  [1, '系统管理', '/system-manage', COMPONENT_EMPTY_PATH, {redirect: '/system-manage/customer'}, [
    [2, '客户管理', 'customer', 'systemManage/Customer.vue'],
    [2, '用户管理', 'user', 'systemManage/User.vue'],
    [2, '操作日志', 'log', 'systemManage/Log.vue', pageUserAdmin]
  ]]
];

export default MENU_LIST;
