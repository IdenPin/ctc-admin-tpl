import Echarts from 'echarts'
import defaultStyle from './defaultStyle'
import _ from 'lodash'
export default class Chart {
  constructor (options) {
    this.opt = {
      el: options.el || '#chart',
      type: options.type || 'line',
      style: options.style || {}
    }
    this.init()
    this.mergeStyle()
  }

  init () {
    this.chart = Echarts.init(document.querySelector(this.opt.el))
    return this
  }

  mergeStyle () {
    // 用户传入的 style 覆盖默认的 style
    this.mergeStyle = _.merge({}, defaultStyle[this.opt.type](), this.opt.style)
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
    if (this.opt.type === 'pie') {
      this.mergeStyleData = _.merge({}, this.mergeStyle, {
        series: [
          {
            type: 'pie',
            radius: [0, '80%'],
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.series
          }
        ]
      })
    }
    console.log('-----', this.mergeStyleData)

    this.chart.setOption(this.mergeStyleData)
    return this
  }

  showLoading () {
    this.chart.showLoading()
    return this
  }

  hideLoading () {
    this.chart.hideLoading()
    return this
  }

  resize () {
    this.chart.resize()
    return this
  }

  dispose () {
    this.chart.dispose()
    return this
  }
}
