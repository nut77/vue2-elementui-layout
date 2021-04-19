<template>
  <el-container>
    <el-header>
      <router-view name="top"></router-view>
    </el-header>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'base-nav'
};
</script>

<style scoped>
</style>
