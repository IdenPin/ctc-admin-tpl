<template>
  <div>
    <div id="chart" style="height: 400px;" ></div>
    <div id="chart-1" style="height: 400px"></div>
    <div id="chart-2" style="height: 400px"></div>
  </div>
</template>
<script>
import Chart from '@@/utils/chart'
export default {
  name: 'admin',
  data () {
    return {}
  },
  mounted () {
    new Chart({
      style: {
        yAxis: [{
          type: 'value',
          name: '水量',
          min: 0,
          max: 250,
          interval: 50,
          // y轴
          axisLabel: {
            formatter: '{value} ml',
            show: true,
            textStyle: {
              color: '#ccc',
              fontSize: 14
            }
          },
          // y轴刻度
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              width: 2 // 这里是坐标轴的宽度
            }
          },
          // y轴网格
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              type: 'solid'
            }
          }
        },
        {
          type: 'value',
          name: '温度',
          min: 0,
          max: 25,
          interval: 5,
          // y轴
          axisLabel: {
            formatter: '{value} °C',
            show: true,
            textStyle: {
              color: '#ccc',
              fontSize: 14
            }
          },
          // y轴刻度
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              width: 2 // 这里是坐标轴的宽度
            }
          },
          // y轴网格
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              type: 'solid'
            }
          }
        }]
      }
    }).source({
      xData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      series: [
        {
          name: '蒸发量',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: '降水量',
          type: 'bar',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: '平均温度',
          type: 'line',
          yAxisIndex: 1,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    })

    new Chart({
      el: '#chart-1',
      type: 'pie',
      style: {
        series: [
          {
            radius: ['50%', '70%']
          }
        ]
      }
    }).source({
      series: [{ value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }]
    })

    new Chart({
      el: '#chart-2',
      type: 'pie',
      style: {
        series: [
          {
            type: 'pie',
            radius: '25%',
            center: ['50%', '50%'],
            animation: false,
            label: {
              position: 'outer',
              alignTo: 'none',
              bleedMargin: 5
            },
            left: 0,
            right: '66.6667%',
            top: 0,
            bottom: 0
          },
          {
            type: 'pie',
            radius: ['20%', '40%'],
            center: ['50%', '50%'],
            animation: false,
            label: {
              position: 'outer',
              alignTo: 'labelLine',
              bleedMargin: 5
            },
            left: '33.3333%',
            right: '33.3333%',
            top: 0,
            bottom: 0
          },
          {
            type: 'pie',
            radius: '25%',
            center: ['50%', '50%'],
            animation: false,
            label: {
              position: 'outer',
              alignTo: 'edge',
              margin: 20
            },
            left: '66.6667%',
            right: 0,
            top: 0,
            bottom: 0
          }
        ]
      }
    }).source({
      series: [[{
        name: 'Apples',
        value: 70
      }, {
        name: 'Strawberries',
        value: 68
      }, {
        name: 'Bananas',
        value: 48
      }, {
        name: 'Oranges',
        value: 40
      }, {
        name: 'Pears',
        value: 32
      }, {
        name: 'Pineapples',
        value: 27
      }, {
        name: 'Grapes',
        value: 18
      }], [{
        name: 'Apples',
        value: 70
      }, {
        name: 'Strawberries',
        value: 68
      }, {
        name: 'Bananas',
        value: 48
      }, {
        name: 'Oranges',
        value: 40
      }, {
        name: 'Pears',
        value: 32
      }, {
        name: 'Pineapples',
        value: 27
      }, {
        name: 'Grapes',
        value: 18
      }], [{
        name: 'Apples',
        value: 70
      }, {
        name: 'Strawberries',
        value: 68
      }, {
        name: 'Bananas',
        value: 48
      }, {
        name: 'Oranges',
        value: 40
      }, {
        name: 'Pears',
        value: 32
      }, {
        name: 'Pineapples',
        value: 27
      }, {
        name: 'Grapes',
        value: 18
      }]]
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
