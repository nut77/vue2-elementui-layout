<template>
  <el-container class="app-container">
    <wrapper-top
      v-if="hasWrapperTop"
      :navList="menuTop"
      :path="path"
      @toggleCollapse="toggleCollapse">
    </wrapper-top>
    <el-container v-if="hasWrapperLeft">
      <wrapper-left
        :navList="menuLeft"
        :path="path"
        :isCollapse="isCollapse">
      </wrapper-left>
      <wrapper-content></wrapper-content>
    </el-container>
    <wrapper-content v-else></wrapper-content>
  </el-container>
</template>

<script>
import WrapperLeft from './WrapperLeft';
import WrapperTop from './WrapperTop';
import WrapperContent from './WrapperContent';
export default {
  name: 'Wrapper',
  components: {WrapperLeft, WrapperTop, WrapperContent},
  data() {
    return {
      hasWrapperTop: true,
      hasWrapperLeft: true,
      routes: null,
      menuLeft: [],
      isCollapse: false,
      path: ['/home']
    };
  },
  computed: {
    menuTop() {
      return this.routes.filter(item => item.meta.index === 1 && item.meta.isNav);
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    refreshWrapper(route) {
      this.hasWrapperTop = route.meta.hasWrapperTop;
      this.hasWrapperLeft = route.meta.hasWrapperLeft;
    },
    setMenuLeft(route) {
      if (!this.routes || !route.matched.length) return;
      const parentPath = route.matched[0].path;
      const parentRouteConfig = this.routes.find(item => item.path === parentPath);
      this.menuLeft = parentRouteConfig && parentRouteConfig.children ? parentRouteConfig.children.filter(item => item.meta.isNav) : [];
    },
    setPath(route) {
      this.path = route.matched.length ? route.matched.map(item => item.path) : [route.path || '/home'];
    },
    initLayout(route) {
      route = route || this.$route;
      this.refreshWrapper(route);
      this.setMenuLeft(route);
      this.setPath(route);
    }
  },
  watch: {
    $route(toRoute) {
      this.initLayout(toRoute);
      console.log(this.$tool.formatDate());
    }
  },
  created() {
    this.routes = this.$router.options.routes;
    this.initLayout();
  }
};
</script>

<style lang="less" scoped>
  body,
  .app-container {
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
</style>
