<template>
  <div :class="['ctc-title-icon', size]">
    <i :class="icon"></i>
    <div class="name" v-if="label">{{ label }}</div>
    <i v-if="suffix" class="el-icon-question cursor-p ml-5"></i>
  </div>
</template>

<script>
export default {
  name: 'CtcTitleIcon',
  props: {
    icon: {
      type: String,
      default: 'el-icon-caret-right'
    },
    suffix: {
      type: Boolean
    },
    /**
     * medium\small\mini
     */
    size: {
      type: String,
      default: 'small'
    },
    label: {
      type: [String, Number]
    }
  }
}
</script>

<style lang="scss" scoped>
.ctc-title-icon {
  display: inline-flex;
  align-items: center;
  .name {
    font-size: 14px;
  }
}
.medium {
  .name {
    font-size: 16px;
  }
}
.small {
  .name {
    font-size: 14px;
  }
}
.mini {
  .name {
    font-size: 12px;
  }
}
</style>
