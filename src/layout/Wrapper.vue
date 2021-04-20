<template>
  <el-container class="app-container">
    <wrapper-top v-if="hasWrapperTop"></wrapper-top>
    <el-container v-if="hasWrapperLeft">
      <wrapper-left></wrapper-left>
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
      hasWrapperLeft: true
    };
  },
  watch: {
    $route: path => {
      // this.wrapperComp = this.$route.meta.nav || 'NavEmpty';
    }
  },
  created() {
    // this.wrapperComp = this.$route.meta.nav || 'NavEmpty';
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
