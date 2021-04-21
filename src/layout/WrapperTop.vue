<template>
  <el-header>
    <h3 class="el-header-title" @click="toggleCollapse">system name</h3>
    <el-menu
      :router="true"
      :default-active="activePath"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item
        v-for="item of navList"
        :index="item.path"
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
  props: ['navList', 'path'],
  data() {
    return {
      test: '',
      activePath: this.path[0]
    };
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggleCollapse');
    }
  },
  watch: {
    path() {
      this.activePath = this.path[0];
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
