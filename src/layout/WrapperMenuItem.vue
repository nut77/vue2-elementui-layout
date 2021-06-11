<template>
  <div class="el-menu-item-box">
    <template v-for="item of navList.filter(listItem => listItem.meta.isNav)">
      <el-menu-item
        v-if="!item.children || (item.children && !isRecursive)"
        :index="item.meta.fullPath"
        :key="item.meta.fullPath">
        <template #title>
          <i :class="item.meta.iconClass"></i>
          <span>{{item.name}}</span>
        </template>
      </el-menu-item>
      <el-submenu v-else :key="item.meta.fullPath" :index="item.meta.fullPath">
        <template #title>
          <i :class="item.meta.iconClass"></i>
          <span>{{item.name}}</span>
        </template>
        <wrapper-menu-item :navList="item.children"></wrapper-menu-item>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'WrapperMenuItem',
  props: {
    navList: Array,
    isRecursive: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>

</style>
