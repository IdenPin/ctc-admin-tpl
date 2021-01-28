<template>
  <div class="ctc-radio-group">
    <el-radio-group v-on="$listeners" v-bind="$attrs" :class="[margin ? 'margin-radio' : '']">
      <el-radio-button
        :border="$attrs.border && $attrs.border !== undefined ? true : false"
        :label="item.value"
        v-for="item in list"
        :key="item.value"
        >{{ item.label }}</el-radio-button
      >
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: 'CtcRadioGroup',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    /**
     * 平铺 margin
     */
    margin: {
      type: Boolean
    }
  },
  mounted() {
    // console.log('$attrs.border', this.$attrs.border !== undefined)
  }
}
</script>
<style lang="scss" scoped>
.ctc-radio-group {
  .margin-radio {
    ::v-deep .el-radio-button {
      margin: 0 5px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      .el-radio-button__inner {
        border: none;
        border-radius: 30px;
      }
    }
  }
}
</style>
