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
    if (this.opt.type === 'line' || this.opt.type === 'bar') {
      this.mergeStyleData = _.merge({}, this.mergeStyle, {
        series: data.series,
        xAxis: {
          data: data.xData || null
        },
        yAxis: {
          data: data.yData || null
        }
      })
    }
    if (this.opt.type === 'pie') {
      const tempData = []
      // 组合 pie
      if (this.mergeStyle.series.length > 1) {
        data.series.forEach(v => {
          tempData.push({
            data: v
          })
        })
      } else {
        // 单个 pie
        tempData.push({
          data: data.series
        })
      }
      this.mergeStyleData = _.merge({}, this.mergeStyle, {
        series: tempData
      })
    }

    if (this.opt.type === 'radar') {
      this.mergeStyleData = _.merge({}, this.mergeStyle, {
        series: data.series,
        radar: data.radar
      })
    }

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
