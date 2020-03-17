<template>
  <div>
    <h3>我是首页</h3>
    <div id="line-chart" style="height: 400px"></div>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="140">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
import dayjs from 'dayjs'
import Echarts from 'echarts'
import _ from 'lodash'
import { Xcharts } from '@pdeng/x-charts'
import Chart from '@@/utils/x-charts/index'
export default {
  name: 'Home',
  data () {
    const item = {
      date: dayjs().format('YYYY-MM-DD hh:mm'),
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518'
    }
    return {
      tableData: Array(30).fill(item),
      chartObj: null
    }
  },
  mounted () {
    this.chartObj = new Chart({
      el: '#line-chart',
      type: 'bar'
    }).showLoading()
    this.chartObj.source().hideLoading()
    console.log('Line', this.chartObj)
    // T.chart.showLoading()
    // T.chart.hideLoading()

    // this.renderChart()
    // this.resizeView()
    // window.addEventListener('resize', _.debounce(this.resizeView, 150))
    // this.$once('hook:beforeDestroy', () => {
    //   if (!this.chartObj) {
    //     return
    //   }
    //   window.removeEventListener('resize', this.resizeView)
    //   this.chartObj.charts.dispose()
    //   this.chartObj = null
    // })

    const layoutAside = document.querySelector('.layout-aside')
    layoutAside.addEventListener('transitionend', _.debounce(this.resizeView, 150))
  },
  methods: {
    renderChart () {
      this.chartObj = new Xcharts('line-chart', 'line')
      this.chartObj.setData()
    },
    resizeView () {
      this.chartObj.resize()
    }
  }
}
</script>
<style lang="scss">
.el-table {
  padding:20px;
}
</style>
