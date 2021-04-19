<template>
  <el-container>
    <el-header>
      <router-view name="top"></router-view>
    </el-header>
    <el-container>
      <el-aside>
        <router-view name="left"></router-view>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Nav.vue'
};
</script>

<style scoped>

</style>
