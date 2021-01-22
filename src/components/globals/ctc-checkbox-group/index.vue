<template>
  <el-checkbox-group v-on="$listeners" v-bind="$attrs" :class="[margin ? 'margin-checkbox' : '']">
    <el-checkbox :label="item.value" v-for="item in list" :key="item.value">{{ item.label }}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
  name: 'CtcCheckboxGroup',
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
  }
}
</script>
<style lang="scss" scoped>
.margin-checkbox {
  ::v-deep .el-checkbox {
    border: 1px solid transparent;
    margin: 0 5px;
    border-radius: 30px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    .el-checkbox__input {
      display: none;
    }
    .el-checkbox__label {
      padding: 2px 10px;
    }
  }

  ::v-deep .is-checked {
    border: 1px solid #0170fe;
  }
}
</style>
