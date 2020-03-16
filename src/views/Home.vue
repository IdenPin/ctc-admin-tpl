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
    this.renderChart()
    this.resizeView()
    window.addEventListener('resize', this.resizeView)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.resizeView)
    })

    const layoutAside = document.querySelector('.layout-aside')
    layoutAside.addEventListener('transitionend', this.resizeView)
  },
  methods: {
    renderChart () {
      this.chartObj = Echarts.init(document.querySelector('#line-chart'))
      this.chartObj.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
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
