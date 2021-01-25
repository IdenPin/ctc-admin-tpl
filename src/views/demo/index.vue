<template>
  <el-card shadow="never" class="m-20">
    <div slot="header" class="clearfix">
      <div class="flex ai-center">
        <h3><i class="el-icon-potato-strips mr-4"></i>基于 ELEMENT UI 组件二次封装</h3>
        <el-button class="ml-30" type="text">查看源码</el-button>
      </div>
    </div>
    <el-tabs v-model="activeMenu">
      <el-tab-pane :label="item.label" :name="item.value + ''" v-for="(item, index) in Const.navMenu" :key="item.value">
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
            <ctc-radio-group border v-model="activeRadio" :list="optList"></ctc-radio-group>
          </div>
        </template>

        <template v-if="index === 5">
          <ctc-checkbox-group v-model="activeCheckbox" margin :list="optList"></ctc-checkbox-group>
        </template>
      </el-tab-pane>
    </el-tabs>
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
      activeMenu: '5',
      activeRadio: 0,
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
<style lang="scss" scoped></style>
