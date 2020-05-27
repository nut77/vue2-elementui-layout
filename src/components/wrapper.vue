<template>
  <el-container>
    <el-header>
      <wrapper-nav></wrapper-nav>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import WrapperNav from './nav';
export default {
  name: 'wrapper',
  components: {WrapperNav}
};
</script>

<style scoped>

</style>
