const fontColor = '#4A4B4D'
const lineColor = '#E9ECF1'
const fontSize = '12px'

const line = {
  tooltip: {
    show: true
  },
  legend: {
    show: false,
    right: 0,
    // icon: 'rect',
    itemWidth: 20,
    itemHeight: 10,
    itemGap: 10
  },
  xAxis: {
    axisLabel: {
      show: true,
      textStyle: {
        color: fontColor,
        fontSize
      }
    },
    // x轴刻度
    axisLine: {
      show: true,
      lineStyle: {
        color: lineColor,
        width: 1
      }
    },
    // 网格
    splitLine: {
      show: false,
      lineStyle: {
        color: fontColor,
        type: 'dashed'
      }
    }
  },
  yAxis: {
    // y轴
    axisLabel: {
      show: true,
      textStyle: {
        color: fontColor,
        fontSize
      }
    },
    // y轴刻度
    axisLine: {
      show: false,
      lineStyle: {
        color: lineColor,
        width: 2 // 这里是坐标轴的宽度
      }
    },
    // y轴网格
    splitLine: {
      show: true,
      lineStyle: {
        color: lineColor,
        type: 'solid'
      }
    }
  }
}

const bar = line

const pie = {
  tooltip: {
    show: false
  },
  series: {
    type: 'pie',
    radius: '85%',
    label: {
      show: false
    },
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 1,
      normal: {
        color: params => {
          return params.data.color || params.color
        }
      }
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },
  legend: {
    show: false
  }
}

export default {
  bar,
  line,
  pie
}
