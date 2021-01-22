<template>
  <el-drawer
    v-on="$listeners"
    v-bind="$attrs"
    :wrapperClosable="wrapperClosable"
    :close-on-press-escape="closeOnPressEscape"
  >
    <div v-if="!$attrs.title" slot="title">
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </el-drawer>
</template>
<script>
export default {
  name: 'CtcDrawer',
  props: {
    /**
     * 点击遮罩层是否可以关闭（默认不可以）
     */
    wrapperClosable: {
      type: Boolean,
      default: false
    },
    /**
     * 是否可以通过按下 ESC 关闭 Drawer（默认不可以）
     */
    closeOnPressEscape: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
// #F8F8F8
::v-deep .el-drawer__header {
  padding: 0 10px;
  margin-bottom: 0;
  line-height: 38px;
  border-bottom: 1px solid #ebeef5;
  background-color: #efeeee;
}
</style>
