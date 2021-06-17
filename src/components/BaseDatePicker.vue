<template>
    <div class="box" :class="isSingleRowDispaly ? '' : 'flexdc'">
      <div class="base-date-picker">
        <i v-if="!isSingleRowDispaly" class="box-icon--start"></i>
        <el-date-picker
          v-model="start"
          @change="handleDateChange"
          :type="type"
          :placeholder="`开始${isDateType ? '日期' : '时间'}`"
          size="mini"
          :format="format"
          :value-format="format"
          :clearable="true"
          :picker-options="getStartPickerOptions()">
        </el-date-picker>
      </div>
      <span v-if="isSingleRowDispaly && isRange" class="box-divider">-</span>
      <div class="base-date-picker"  v-if="isRange">
        <i v-if="!isSingleRowDispaly" class="box-icon--end"></i>
        <el-date-picker
          v-model="end"
          @change="handleDateChange"
          :type="type"
          :placeholder="`结束${isDateType ? '日期' : '时间'}`"
          size="mini"
          :format="format"
          :value-format="format"
          :clearable="true"
          :picker-options="getEndPickerOptions()">
        </el-date-picker>
      </div>
    </div>
</template>

<script>
export default {
  name: 'BaseDatePicker',
  props: {
    type: {
      type: String,
      // date
      default: 'datetime'
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    isRange: {
      type: Boolean,
      default: true
    },
    // 初始化的时间的值，如果是范围 就传入一个数组
    value: {
      type: [String, Array, Number],
      default: ''
    },
    // 是否单行展示，针对时间范围选择
    isSingleRowDispaly: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      range: '',
      start: '',
      end: ''
    };
  },
  computed: {
    isDateType() {
      return this.type === 'date';
    },
    // 日期范围才需要
    dateInitTimeRange() {
      return this.isDateType ? [' 00:00:00', ' 23:59:59'] : ['', ''];
    },
    startTimestamp() {
      const start = this.start && this.isDateType ? (this.start + this.dateInitTimeRange[0]) : this.start;
      return new Date(start).getTime() || '';
    },
    startDateTimestamp() {
      const startDate = this.start.replace(/(?<=\s)\S*/g, '').trim();
      return new Date(startDate && (startDate + ' 00:00:00')).getTime() || '';
    },
    endTimestamp() {
      const end = this.end && this.isDateType ? (this.end + this.dateInitTimeRange[0]) : this.end;
      return new Date(end).getTime() || '';
    },
    endDateTimestamp() {
      const endDate = this.end.replace(/(?<=\s)\S*/g, '').trim();
      return new Date(endDate && (endDate + ' 00:00:00')).getTime() || '';
    }
  },
  methods: {
    getRange() {
      const timeInit = this.isDateType ? [' 00:00:00', ' 23:59:59'] : ['', ''];
      return [
        this.start ? new Date(this.start + timeInit[0]).getTime() : '',
        this.end ? new Date(this.end + timeInit[1]).getTime() : ''
      ];
    },
    getStartPickerOptions() {
      const timeInit = this.isDateType ? [' 00:00:00', ' 23:59:59'] : ['', ''];
      return {
        disabledDate: time => {
          const endTimeStr = this.end;
          return endTimeStr ? time.getTime() > new Date(endTimeStr + timeInit[1]).getTime() : time.getTime() > Date.now();
        }
      };
    },
    getEndPickerOptions() {
      // 如果开始时间不为空，则结束时间大于开始时间且小于当前时间;开始时间为空，结束时间最大值小于等于当天
      return {
        disabledDate: time => {
          const timestamp = time.getTime();
          const dateNow = Date.now();
          if (this.startDateTimestamp) {
            return timestamp < this.startDateTimestamp || timestamp > dateNow;
          }
          if (this.startDateTimestamp === timestamp) console.log(123);
          return timestamp > dateNow;
        }
      };
    },
    handleDateChange() {
      this.start = this.start || '';
      this.end = this.end || '';
      this.range = this.start + (this.start && this.end && '/') + this.end;
      this.$emit('change');
    },
    clearDate() {
      this.range = '';
      this.start = '';
      this.end = '';
    },
    handleClick(event) {
      let elem = event.target || event.srcElement;
      while (elem) {
        if (elem.classList && Array.from(elem.classList).includes('dropdownWrap')) return false;
        elem = elem.parentNode;
      }
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

<style scoped lang="less">
  .box {
    .dflex;
    &.flexdc {
      flex-direction: column;
      .base-date-picker + .base-date-picker {
        .mgt10;
      }
    }
  }
  .box-divider {
    padding: 0 5px;
    margin-top: 3px;
    color: @color-text-regular;
  }
  .base-date-picker {
    .el-input {
      width: 200px;
    }
  }
</style>
