<template>
  <el-header>
    <h3 class="el-header-title" @click="toggleCollapse">system name</h3>
    <el-menu
      v-if="!isOnlyNavLeft"
      @select="$emit('setEnableSetMenuLeft', true)"
      :router="true"
      :default-active="activePath"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <wrapper-menu-item :navList="navList" :isRecursive="isOnlyNavTop"></wrapper-menu-item>
    </el-menu>
    <div class="el-header-user">
      {{$store.state.userInfo.username}}
      <el-button type="danger" icon="el-icon-switch-button" circle @click="handleLogout"></el-button>
    </div>
  </el-header>
</template>

<script>
import WrapperMenuItem from './WrapperMenuItem';
export default {
  name: 'WrapperTop',
  props: ['navList', 'path'],
  components: {WrapperMenuItem},
  data() {
    return {
      activePath: this.$store.state.isOnlyNavTop ? this.path[this.path.length - 1] : this.path[0]
    };
  },
  computed: {
    isOnlyNavTop() {
      return this.$store.state.isOnlyNavTop;
    },
    isOnlyNavLeft() {
      return this.$store.state.isOnlyNavLeft;
    }
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggleCollapse');
    },
    handleLogout() {
      this.$store.commit('mutationResetStore');
      localStorage.clear();
      this.$router.push('/login');
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
  .el-menu--horizontal .el-menu-item-box {
    display: flex;
  }
</style>
