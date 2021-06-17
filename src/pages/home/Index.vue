<template>
  <div>
    首页
    // 日期时间选择器
      if (!this.isDateType) {
        const dateNow = Date.now();
        if (this.startTimestamp > dateNow) this.start = dateNow;
        if (this.endTimestamp > dateNow) this.end = dateNow;
      }
    <base-date-picker/>
  </div>
</template>

<script>
export default {
  name: 'Index'
};
</script>

<style scoped>

</style>
