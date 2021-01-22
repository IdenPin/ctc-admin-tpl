<template>
  <el-dialog
    :class="['ctc-dialog', centerLayout ? 'center-layout' : '']"
    v-on="$listeners"
    v-bind="$attrs"
    :append-to-body="true"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
  >
    <span v-if="!$attrs.title" slot="title" style="color:#666">
      <slot name="title"></slot>
    </span>
    <slot></slot>
    <span slot="footer">
      <slot name="footer"></slot>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'CtcDialog',
  props: {
    /**
     * 写入 v-dialogDrag 可开启拖拽
     */

    /**
     * 弹层布局是否开启水平垂直居中
     */
    centerLayout: {
      type: Boolean,
      default: true
    },
    /**
     * 取消点击空白处关闭弹层的默认值（默认不可以）
     */
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    /**
     * 是否可以通过按下 ESC 关闭 Dialog	（默认不可以）
     */
    closeOnPressEscape: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.center-layout {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
.ctc-dialog {
  ::v-deep .el-dialog {
    overflow: hidden;
  }
  ::v-deep .el-dialog__title {
    font-size: 15px;
  }

  ::v-deep .el-dialog__header {
    padding: 0 20px;
    line-height: 38px;
    overflow: hidden;
    color: #fff;
    font-size: 14px;
    background-image: #fff;
    border-bottom: 1px solid #ebeef5;
    // background-image: linear-gradient(to left, #38788b, #06a771);
  }
  ::v-deep .el-dialog__headerbtn .el-dialog__close {
    color: $greyColor1;
  }

  ::v-deep .el-dialog__body {
    padding: 0;
  }

  ::v-deep .el-dialog__headerbtn {
    top: 10px;
  }
  .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
}
</style>
