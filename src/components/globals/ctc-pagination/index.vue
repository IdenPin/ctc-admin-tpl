<template>
  <el-pagination
    v-on="$listeners"
    v-bind="$attrs"
    :layout="layout"
    :total="pager.total"
    :current-page.sync="pager.currentPage"
    :pager-size="pager.pageSize"
  >
  </el-pagination>
</template>
<script>
import Config from '@/config'
export default {
  name: 'CtcPagination',
  props: {
    /**
     * 修改默认的 layout
     */
    layout: {
      type: String,
      default: 'total, prev, pager, next'
    },
    /**
     * 分页对象
     */
    pager: {
      type: Object,
      default: Config.project.pager(),
      required: true
    }
  }
}
</script>
