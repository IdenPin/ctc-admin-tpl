<template>
  <div class="flex ai-center">
    <div :id="`chart-${uuid}`" :style="{ width, height }"></div>
    <div class="legend-wrap ml-20 flex-1" v-if="type === 'pie'">
      <div class="flex al-center">
        <div class="flex-1">
          <div class="item" v-for="item in listData" :key="item.value">
            <i class="mr-5" :style="{ backgroundColor: item.color }"></i>
            <div>{{ item.name }}</div>
            <div class="line"></div>
            <div>{{ item.value }}{{ sData[0].unit }}</div>
          </div>
        </div>
        <div style="width: 20px" v-if="listData[0].key">
          <el-checkbox-group
            v-model="checked"
            @change="
              val => {
                $emit('change', val)
              }
            "
          >
            <el-checkbox :label="item.key" class="my-2 ml-5" v-for="item in listData" :key="item.value"
              ><span style="color:#fff"></span
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import defaultOption from './assets/defaultOption'
import _ from 'lodash'

export default {
  name: 'CtcChart',
  data() {
    return {
      checked: [1, 2],
      uuid: ((100000 * Math.random()) >> 0) + Date.now()
    }
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },

    height: {
      type: String,
      default: '500px'
    },

    /**
     * 图表类型
     */
    type: {
      type: String,
      default: 'line'
    },

    /**
     * 图表配置参数
     */
    option: {
      type: Object,
      default: () => {}
    },

    /**
     * x 轴的数据
     */
    xData: {
      type: Array,
      default: () => []
    },

    /**
     * y 轴的数据
     */
    yData: {
      type: Array,
      default: () => []
    },

    /**
     * series数据
     */
    sData: {
      type: [Object, Array],
      default: () => {}
    }
  },
  computed: {
    listData() {
      return this.sData[0].data
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const myChart = echarts.init(document.getElementById(`chart-${this.uuid}`))
      myChart.showLoading({ text: '加载中...' })

      const type = this.type.toLowerCase()
      let option = _.merge(defaultOption[type], this.option)
      myChart.setOption(option)

      setTimeout(() => {
        if (this.isLineOrBar()) {
          const isX = this.xData.length > 0
          myChart.setOption({
            series: this.sData,
            [isX ? 'xAxis' : 'yAxis']: {
              data: this[isX ? 'xData' : 'yData']
            }
          })
        } else {
          myChart.setOption({
            series: this.sData
          })
        }
        myChart.hideLoading()
      }, 1000)

      /**
       * 派发完成事件
       */
      this.$emit('complete', myChart)
    },
    isLineOrBar() {
      const type = this.type.toLowerCase()
      return type === 'line' || type === 'bar'
    }
  }
}
</script>

<style lang="scss" scoped>
.legend-wrap {
  .item {
    display: flex;
    align-items: center;
    margin: 3px 0;
    i {
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ccc;
    }
    .line {
      height: 0;
      border-bottom: 1px dashed #e9ecf1;
      flex: 1;
      margin: 0 5px;
    }
  }
}
</style>
