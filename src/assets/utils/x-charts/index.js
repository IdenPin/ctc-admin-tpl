import Echarts from 'echarts'
export default class Xcharts {
  constructor ({ el, type }) {
    this.opt = {
      el: el || '#chart',
      type: type || 'line'
    }
    this.init()
  }

  init () {
    this.chart = Echarts.init(document.querySelector(this.opt.el))
    return this
  }

  source () {
    this.chart.setOption({
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: this.opt.type,
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
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
    }, 4000)
  }

  resize () {
    this.chart.resize()
  }
}

console.log('----', Echarts)
