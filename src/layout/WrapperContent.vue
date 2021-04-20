<template>
  <el-main>
    <router-view></router-view>
  </el-main>
</template>

<script>
export default {
  name: 'WrapperContent'
};
</script>

<style lang="less" scoped>
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
