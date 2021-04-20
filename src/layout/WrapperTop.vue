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
      <el-menu-item
        v-for="item of navList"
        :index="item.redirect ? item.redirect : item.path"
        :key="item.name">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.name}}</span>
        </template>
      </el-menu-item>
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
      activePath: '/home'
    };
  },
  computed: {
    navList() {
      return this.$router.options.routes.filter(item => item.meta.index === 1 && item.meta.isNav);
    }
  },
  methods: {
    handleSelect(path) {
      this.activePath = path;
    }
  },
  created() {
    this.activePath = this.$route.path;
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
