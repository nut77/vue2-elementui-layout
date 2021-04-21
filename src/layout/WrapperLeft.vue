<template>
  <el-aside :style="{width: `${isCollapse ? 63 : 220}px !important`}">
    <el-menu
      :collapse="isCollapse"
      :router="true"
      :default-active="activePath"
      class="el-menu-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <template v-for="item of navList">
        <el-menu-item
          v-if="!item.children"
          :index="getFullPath(path[0], item.path)"
          :key="getFullPath(path[0], item.path)">
          <template slot="title">
            <i class="el-icon-eleme"></i>
            <span>{{item.name}}</span>
          </template>
        </el-menu-item>
        <el-submenu v-else :key="getFullPath(path[0], item.path)" :index="getFullPath(path[0], item.path)">
          <template slot="title">
            <i class="el-icon-eleme"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item
            v-for="itemc of item.children"
            :index="getFullPath(path[0], item.path, itemc.path)"
            :key="getFullPath(path[0], item.path, itemc.path)">
            <template slot="title">
              <i class="el-icon-eleme"></i>
              <span>{{itemc.name}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'WrapperLeft',
  props: ['navList', 'path', 'isCollapse'],
  data() {
    return {
      activePath: this.path[this.path.length - 1]
    };
  },
  methods: {
    getFullPath(...rest) {
      return rest.join('/');
    }
  },
  watch: {
    path() {
      this.activePath = this.path[this.path.length - 1];
    }
  }
};
</script>

<style lang="less" scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
</style>
