<template>
  <div>
    <h3>我是首页</h3>
    <div v-for="i in 10" :key="i" :id="`line-chart-${i}`" style="height: 400px"></div>
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
import _ from 'lodash'
import Chart from '@@/utils/chart'
export default {
  name: 'Home',
  data () {
    const item = {
      date: dayjs().format('YYYY-MM-DD hh:mm'),
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518'
    }
    return {
      tableData: Array(30).fill(item)
    }
  },
  mounted () {
    for (var i = 1; i <= 10; i++) {
      this['chart' + i] = new Chart({
        el: `#line-chart-${i}`,
        type: 'bar',
        style: {
          title: {
            text: `图表${i}`
          },
          series: [
            {
              smooth: true,
              type: 'line'
            },
            {
              smooth: true,
              type: 'line'
            }
          ]
        }
      })
        .showLoading()
        .source({
          xData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
          series: [{
            name: '销量',
            type: 'bar',
            data: Array.from({ length: 6 }, () => {
              return String(Math.random()).slice(-2)
            })
          },
          {
            name: '售价',
            type: 'line',
            data: Array.from({ length: 6 }, () => {
              return String(Math.random()).slice(-2)
            })
          }]
        })
        .hideLoading()
    }

    window.addEventListener('resize', _.debounce(this.resizeView, 150))
    this.$once('hook:beforeDestroy', () => {
      if (!this.chart1) {
        return
      }
      window.removeEventListener('resize', this.resizeView)
      for (var i = 1; i <= 10; i++) {
        this['chart' + i].dispose()
        this['chart' + i] = null
      }
    })

    const layoutAside = document.querySelector('.layout-aside')
    layoutAside.addEventListener('transitionend', _.debounce(this.resizeView, 150))
  },
  methods: {
    resizeView () {
      if (this.chart1) {
        for (var i = 1; i <= 10; i++) {
          this['chart' + i].resize()
        }
      }
    }
  }
}
</script>
<style lang="scss">
.el-table {
  padding:20px;
}
</style>
