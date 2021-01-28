<template>
  <ctc-drawer
    custom-class="question-drawer"
    :visible.sync="visible"
    width="460px"
    :modal="true"
    :wrapperClosable="true"
    :closeOnPressEscape="true"
    direction="rtl"
  >
    <div slot="title">{{ title }}</div>
    <div class="content">
      <components :is="content" />
    </div>
  </ctc-drawer>
</template>

<script>
/**
 * 全局抽屉遮罩层
 * 注意传入的组件必须配置name熟悉
 */
export default {
  name: 'QuestionDrawer',
  data() {
    return {
      visible: false,
      title: '',
      content: ''
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .question-drawer {
  // top: 44px !important;

  .content {
    padding: 0 30px 15px;
    height: calc(100vh - 100px);
    overflow-y: auto;
    .title {
      font-size: 15px;
      color: #303133;
      margin: 15px 0;
    }
    .text {
      font-size: 14px;
      color: #666666;
      letter-spacing: 0;
      line-height: 22px;
    }
  }
}
</style>
