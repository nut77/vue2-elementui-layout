<template>
  <div class="dflex box">
    <div class="box-top dflex">
      <div class="box-top-item" v-for="item of boxTopList" :key="item.title">
        <p class="box-title">{{item.title}}</p>
        <div class="box-content" :class="item.data ? '' : 'box--empty'"></div>
      </div>
    </div>
    <div class="box-bottom mgt20 flex">
      <p class="box-title">订单趋势</p>
      <div class="box-content box--empty"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  data() {
    return {
      boxTopList: [
        {title: '已完成订单', data: null, chart: null},
        {title: '已完成订单分类统计', data: null, chart: null},
        {title: '未完成订单', data: null, chart: null},
        {title: '未完成订单分类统计', data: null, chart: null}
      ]
    };
  }
};
</script>

<style scoped lang="less">
  .box {
    flex-direction: column;
  }
  .box-top {
    justify-content: space-between;
    height: 250px;
    min-height: 250px;
  }
  .box-top-item {
    min-width: 250px;
  }
  .box-top-item,
  .box-bottom {
    .dflex;
    flex-direction: column;
    .pd15;
    background: @background-color-lighter;
    border-radius: 5px;
  }
  .box-bottom {
    min-height: 300px;
  }
  .box-content {
    .flex;
  }
</style>
