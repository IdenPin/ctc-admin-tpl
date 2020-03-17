import Echarts from 'echarts'
export default class Xcharts {
  constructor (el) {
    this.el = el
    this.initCharts()
  }

  initCharts () {
    console.log('this', this)
  }
}
