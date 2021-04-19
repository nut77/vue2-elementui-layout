<template>
  <div id="app">
    <keep-alive>
      <component :is="wrapperComp"></component>
    </keep-alive>
  </div>
</template>

<script>
import NavEmpty from './NavEmpty';
import Nav from './Nav';
import NavTop from './NavTop';
export default {
  name: 'App',
  components: {NavEmpty, Nav, NavTop},
  data() {
    return {
      wrapperComp: 'NavEmpty'
    };
  },
  watch: {
    '$route.path': path => {
      this.wrapperComp = this.$route.meta.nav || 'NavEmpty';
    }
  },
  created() {
    this.wrapperComp = this.$route.meta.nav || 'NavEmpty';
  }
};
</script>
