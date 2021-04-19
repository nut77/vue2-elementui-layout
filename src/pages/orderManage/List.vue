<template>
  <div>
    list
    <list-header></list-header>
    <list-body></list-body>
    <list-footer></list-footer>
  </div>
</template>

<script>
import ListHeader from './components/ListHeader';
import ListBody from './components/ListBody';
import ListFooter from './components/ListFooter';
export default {
  name: 'Index',
  components: {ListHeader, ListBody, ListFooter}
};
</script>

<style scoped>

</style>
