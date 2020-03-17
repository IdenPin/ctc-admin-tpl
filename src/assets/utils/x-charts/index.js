import Echarts from 'echarts'
import _ from 'lodash'
export default class Xcharts {
  constructor ({ el, type, style }) {
    this.opt = {
      el: el || '#chart',
      type: type || 'line',
      style: style || {}
    }
    this.defaultStyle = {
      title: {
        text: 'xCharts示例'
      },
      tooltip: {
        trigger: 'axis',
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 0,
        padding: [5, 12, 5, 12],
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
      },
      xAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ccc',
            width: 2
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ccc',
            fontSize: 12
          },
          rotate: 0
        }
      },
      yAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ccc',
            width: 2
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ccc',
            fontSize: 12
          },
          rotate: 0
        }
      }
    }
    this.init()
    this.mergeStyle()
  }

  init () {
    this.chart = Echarts.init(document.querySelector(this.opt.el))
    return this
  }

  mergeStyle () {
    // 前面覆盖后面的
    this.mergeStyle = _.merge({}, this.defaultStyle, this.opt.style)
    return this
  }

  source (data) {
    this.mergeStyleData = _.merge({}, this.mergeStyle, {
      series: data.series,
      xAxis: {
        data: data.xData || null
      },
      yAxis: {
        data: data.yData || null
      }
    })
    this.chart.setOption(this.mergeStyleData)
    return this
  }

  showLoading () {
    this.chart.showLoading()
    return this
  }

  hideLoading () {
    setTimeout(() => {
      this.chart.hideLoading()
      return this
    }, 500)
  }

  resize () {
    this.chart.resize()
  }

  dispose () {
    this.chart.dispose()
  }
}

console.log('----', Echarts)
