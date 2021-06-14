const option = {};
option.line = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#C9D2FF',
    transitionDuration: 0,
    textStyle: {
      color: '#10101D',
      fontSize: 12
    },
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    top: 30,
    left: 60,
    right: 30,
    bottom: 60
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLabel: {
      color: '#c9d2ff',
      fontSize: 10
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#262e54',
        width: 0.7,
        type: 'solid'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#262e54'
      }
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    axisLine: {
      lineStyle: {
        color: '#262e54'
      }
    },
    axisLabel: {
      color: '#c9d2ff'
    },
    splitLine: {
      lineStyle: {
        color: '#262e54',
        width: 0.7,
        type: 'solid'
      }
    }
  },
  series: [{
    type: 'line',
    lineStyle: {
      color: '#ff8800'
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: '#ff8800'
        }, {
          offset: 1, color: 'rgba(255, 150, 79, 0.01)'
        }]
      }
    }
  }],
  dataZoom: [
    {
      id: 'dataZoomX',
      type: 'inside',
      xAxisIndex: [0],
      filterMethod: 'none',
      start: 0,
      end: 200,
      handleSize: 8
    }
  ]
};
option.bar = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#C9D2FF',
    transitionDuration: 0,
    textStyle: {
      color: '#10101D',
      fontSize: 12
    },
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#c9d2ff'
      }
    }
  },
  grid: {
    top: 60,
    left: 60,
    right: 30,
    bottom: 50
  },
  textStyle: {
    color: '#c9d2ff'
  },
  color: ['#41b2ff', '#06ae1c', '#ec2f4f'],
  legend: {
    data: ['总数据节点', '去重数据节点', '风险数据节点'],
    textStyle: {
      color: '#c9d2ff'
    },
    left: 35
  },
  xAxis: [
    {
      axisLabel: {
        interval: 0,
        rotate: 20
      },
      type: 'category',
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      interval: 50,
      axisLabel: {
        formatter: '{value}'
      },
      axisLine: {
        lineStyle: {
          color: '#262e54'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#262e54',
          width: 0.7,
          type: 'solid'
        }
      }
    }
  ],
  series: [
    {
      name: '总数据节点',
      type: 'bar',
      barWidth: 10,
      barGap: '70%'
    },
    {
      name: '去重数据节点',
      type: 'bar',
      barWidth: 10
    },
    {
      name: '风险数据节点',
      type: 'bar',
      barWidth: 10
    }
  ]
};

export default {
  data() {
    return {
      option
    };
  }
};
