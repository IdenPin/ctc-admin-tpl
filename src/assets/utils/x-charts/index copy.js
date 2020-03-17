import Echarts from 'echarts'
export default class Xcharts {
  constructor (opt) {
    this.opt = opt
    this.init(opt.el)
  }

  init () {
    const _chart = this.chart = Echarts.init(this.dom)
    const that = this
    Object.keys(_chart).forEach((key) => {
      that._proxy(key)
    })
    this.chart = Echarts.init(document.querySelector(this.opt.el))
    return this
  }
}

Xcharts.prototype._proxy = function (key) {
  const that = this
  Object.defineProperty(that, key, {
    configurable: false, // 不可以重新定义
    enumerable: true, // 可以枚举
    get () {
      // 获取this._data属性时，将参数的data属性值返回
      return that._chart[key]
    },
    set (newVal) {
      // 给this._data内属性赋予新值
      that._chart[key] = newVal
    }
  })
}

// console.log('----', Echarts)
