<template>
  <el-menu mode="horizontal">
    <el-menu-item>首页</el-menu-item>
    <el-submenu>
      <template slot="title">组织概况</template>
      <el-menu-item>全年大事件</el-menu-item>
      <el-submenu>
        <template slot="title">研发部</template>
        <el-menu-item>项目总览</el-menu-item>
        <el-menu-item>绩效</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'base-nav'
};
</script>

<style scoped>
</style>
