<template>
  <el-card shadow="never" class="m-20">
    <div slot="header" class="clearfix">
      <div class="flex ai-center">
        <h3><i class="el-icon-potato-strips mr-4"></i>基于 ELEMENT UI 组件二次封装</h3>
        <el-button class="ml-30" type="text">查看源码</el-button>
      </div>
    </div>
    <div class="my-20" v-for="(item, index) in Const.navMenu" :key="item.value">
      <!-- 地图组件 -->
      <template v-if="index === 0">
        <ctc-chart
          :sData="[
            {
              data: [
                { value: 1048, name: '正常', color: '#52C41A' },
                { value: 735, name: '超标', color: '#F5313B' },
                { value: 580, name: '掉线', color: '#FFB30A' },
                { value: 484, name: '停运', color: '#bfbfbf' }
              ],
              unit: '家'
            }
          ]"
          type="pie"
          width="120px"
          height="120px"
        />

        <ctc-chart
          class="mb-20"
          :yData="['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']"
          :sData="{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }"
          :option="{
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'category'
            }
          }"
        />
        <ctc-chart
          class="mb-20"
          :xData="['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']"
          :option="{
            xAxis: {
              type: 'category'
            },
            yAxis: {
              type: 'value'
            }
          }"
          :sData="[
            {
              name: '2011年',
              type: 'line',
              barWidth: 20,
              data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
              name: '2012年',
              type: 'bar',
              barWidth: 20,
              data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
          ]"
        />
      </template>
      <template v-if="index === 0">
        <ctc-map class="mb-20" width="100%" />
      </template>
      <template v-if="index === 0">
        <el-button type="primary" @click="dialogVisible = true">开启弹层</el-button>
        <ctc-dialog v-dialogDrag title="我是标题" :visible.sync="dialogVisible">
          <div class="p-20">我是弹层内容</div>
          <div slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </div>
        </ctc-dialog>
      </template>
      <template v-if="index === 1">
        <el-button type="primary" @click="drawerVisbble = true">打开抽屉</el-button>
        <ctc-drawer :visible.sync="drawerVisbble" direction="rtl" :before-close="beforeCloseDrawer">
          <div slot="title">我是Drawer标题</div>
          <div class="p-20">这是Drawer内容</div>
        </ctc-drawer>
      </template>
      <template v-if="index === 2">
        <ctc-number label="排放量" :num="(10000000 * Math.random()) << 0" unit="kg" />
      </template>
      <template v-if="index === 3">
        <div class="p-20">
          <h4>后端分页：</h4>
          <ctc-pagination @current-change="() => {}" :pager="pager1" />

          <h4 class="my-10">前端分页：</h4>
          <p>所有数据：{{ tempData }}</p>
          <el-tag class="my-10">当前页数据：{{ currentData }}</el-tag>
          <ctc-pagination @current-change="currentChangeFn" background :pager="pager2" />
        </div>
      </template>

      <template v-if="index === 4">
        <ctc-radio-group v-model="activeRadio" margin :list="optList"></ctc-radio-group>

        <div class="mt-20">
          <ctc-radio-group v-model="activeRadio" :list="optList"></ctc-radio-group>
        </div>
      </template>

      <template v-if="index === 5">
        <ctc-checkbox-group v-model="activeCheckbox" margin :list="optList"></ctc-checkbox-group>
      </template>

      <template v-if="index === 6">
        <ctc-card title="我是标题" class="mb-30">
          我是内容
        </ctc-card>

        <ctc-card class="mb-20" width="370px" handleOpt="toggleOpen">
          <div slot="header">重点排污单位VOCs排放企业<i class="el-icon-question cursor-p ml-5"></i></div>
          <ctc-number class="mb-10" :num="(10000000 * Math.random()) << 0" unit="家" />
          <ctc-divider direction="h" size="mini"></ctc-divider>
          我是测试内容<br />
          我是测试内容<br />
          我是测试内容<br />
          我是测试内容<br />
          我是测试内容<br />
          我是测试内容<br />
        </ctc-card>

        <ctc-card
          class="mb-20"
          width="600px"
          background="#f3f3f3"
          color="#333"
          handleOpt="toggleCollspan"
          :isOpen="false"
        >
          <div slot="header">重点排污单位VOCs排放企业<i class="el-icon-question cursor-p ml-5"></i></div>
          <ctc-number class="mb-10" :num="(10000000 * Math.random()) << 0" unit="家" />
          <ctc-divider direction="h" size="mdeium"></ctc-divider>
          我是测试内容<br />
          我是测试内容<br />
          我是测试内容<br />
          我是测试内容<br />
          我是测试内容<br />
          我是测试内容<br />
        </ctc-card>

        <ctc-card width="370px" class="mb-30" handleOpt="toggleCollspan">
          <div slot="header">
            <div class="flex">
              <div v-for="(item, index) in ['炉型分析', '超达标分析', '豁免']" :key="index">
                <div
                  :class="['flex', 'cursor-p', index === cardTabActiveIndex ? 'active' : '']"
                  @click="cardTabActiveIndex = index"
                >
                  <span>{{ item }}</span>
                  <ctc-divider direction="v" v-if="index !== 2" />
                </div>
              </div>
            </div>
          </div>
          <div>
            {{ cardTabActiveIndex }}
          </div>
        </ctc-card>
      </template>

      <template v-if="index === 7">
        <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
        <ctc-divider direction="v" />
        <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>

        <ctc-divider content-position="left">少年包青天</ctc-divider>
        <ctc-divider content-position="right">阿里云</ctc-divider>

        <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
        <ctc-divider direction="h" size="small" />
        <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
      </template>

      <template v-if="index === 8">
        <ctc-tab-btn v-model="cardTabActiveIndex" :list="['炉型分析', '超达标分析', '豁免']" @change="testFn" />
      </template>
    </div>
  </el-card>
</template>
<script>
import Const from './assets/const'
import Config from '@/config'
export default {
  name: 'DemoIndex',
  data() {
    return {
      Const,

      activeRadio: 0,
      cardTabActiveIndex: 1,
      activeCheckbox: [0, 1],
      optList: [
        { label: '北京', value: 0 },
        { label: '西安', value: 1 },
        { label: '上海', value: 2 }
      ],
      dialogVisible: false,
      drawerVisbble: false,
      tempData: Array.from({ length: 50 }, _ => (100 * Math.random()) << 0),
      dataList: [],
      currentData: [],
      pager1: Config.project.pager(),
      pager2: Config.project.pager()
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    testFn(val) {
      alert(val)
    },
    testConsole(val) {
      //   <!-- <amap-marker
      //   :position="[116.473179, 39.993169]"
      //   :label="{
      //     content: '测试展示',
      //     direction: 'bottom'
      //   }"
      // /> -->
      // console.log('this.$refs.myMap.$map', this.$refs.myMap.$map)

      console.log('---', val.Marker)
    },
    beforeCloseDrawer(done) {
      this.$confirm('确认关闭？', { type: 'warning' })
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async fetchList() {
      const { data, total } = await new Promise((resolve, rejects) => {
        resolve({
          total: this.tempData.length,
          data: this.tempData
        })
      })
      this.dataList = data
      this.pager2.total = total
      this.currentData = this.dataList.slice(0, this.pager2.pageSize)
    },
    currentChangeFn(currentPage) {
      const startIndex = (currentPage - 1) * this.pager2.pageSize
      const endIndex = this.pager2.pageSize * currentPage
      this.currentData = this.dataList.slice(startIndex, endIndex)
    }
  }
}
</script>
<style lang="scss" scoped>
.active {
  color: $mainColor;
}
</style>
