<template>
    <div class="dflex">
      <div class="dropdownBox-timeItem">
        <i class="dropdownBox-timeStartIcon"></i>
        <el-date-picker
          v-model="item.start"
          @change="() => changeDate(item)"
          :type="type"
          :placeholder="`开始${'date' === type ? '日期' : '时间'}`"
          size="mini"
          :format="format"
          :value-format="format"
          :clearable="true"
          :picker-options="startDate(item)">
        </el-date-picker>
      </div>
      <div class="dropdownBox-timeItem">
        <i class="dropdownBox-timeEndIcon"></i>
        <el-date-picker
          v-model="item.end"
          @change="() => changeDate(item)"
          :type="type"
          :placeholder="`结束${'date' === type ? '日期' : '时间'}`"
          size="mini"
          :format="format"
          :value-format="format"
          :clearable="true"
          :picker-options="endDate(item)">
        </el-date-picker>
      </div>
    </div>
</template>

<script>
export default {
  name: 'timeRange',
  props: ['type', 'format'],
  data() {
    return {
      item: {
        range: '',
        start: '',
        end: ''
      }
    };
  },
  methods: {
    getRange() {
      const timeInit = this.type === 'date' ? [' 00:00:00', ' 23:59:59'] : ['', ''];
      return [
        this.item.start ? new Date(this.item.start + timeInit[0]).getTime() : '',
        this.item.end ? new Date(this.item.end + timeInit[1]).getTime() : ''
      ];
    },
    startDate(item) {
      const timeInit = this.type === 'date' ? [' 00:00:00', ' 23:59:59'] : ['', ''];
      return {
        disabledDate(time) {
          const endTimeStr = item.end;
          return endTimeStr ? time.getTime() > new Date(endTimeStr + timeInit[1]).getTime() : time.getTime() > Date.now();
        }
      };
    },
    endDate(item) {
      const timeInit = this.type === 'date' ? [' 00:00:00', ' 23:59:59'] : ['', ''];
      // 如果开始时间不为空，则结束时间大于开始时间且小于当前时间;开始时间为空，结束时间最大值小于等于当天
      return {
        disabledDate(time) {
          const startTimeStr = item.start;
          if (startTimeStr) {
            return time.getTime() < new Date(startTimeStr + timeInit[0]).getTime() || time.getTime() > Date.now();
          }
          return time.getTime() > Date.now();
        }
      };
    },
    changeDate(item) {
      item.start = item.start || '';
      item.end = item.end || '';
      item.range = item.start + (item.start && item.end && '/') + item.end;
      this.$emit('change');
    },
    removeDate() {
      this.item.range = '';
      this.item.start = '';
      this.item.end = '';
    },
    hideDropdownBox() {
      this.item.isOpen = false;
    },
    handleClick(event) {
      let elem = event.target || event.srcElement;
      while (elem) {
        if (elem.classList && Array.from(elem.classList).includes('dropdownWrap')) return false;
        elem = elem.parentNode;
      }

      this.item.isOpen = false;
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClick);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClick);
  }
};
</script>
