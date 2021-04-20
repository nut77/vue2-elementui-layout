<template>
  <el-header>
    <h3 class="el-header-title">system name</h3>
    <el-menu
      :router="true"
      :default-active="activePath"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item v-for="item of navList" :index="item.path" :key="item.name">{{item.name}}</el-menu-item>
    </el-menu>
    <div class="el-header-user">
      username
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'WrapperTop',
  data() {
    return {
      activePath: '/home',
      navList: [
        {name: '首页', path: '/home'},
        {name: '订单管理', path: '/order'},
        {name: '物流管理', path: '/logistics'},
        {name: '商品管理', path: '/commodity'},
        {name: '系统管理', path: '/system'}
      ]
    };
  },
  methods: {
    handleSelect(path) {
      this.activePath = path;
    }
  }
};
</script>

<style lang="less" scoped>
  .el-header {
    display: flex;
    height: 60px;
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-header-title {
    display: inline-block;
    width: 200px;
  }
  .el-menu {
    flex: 1;
  }
</style>
