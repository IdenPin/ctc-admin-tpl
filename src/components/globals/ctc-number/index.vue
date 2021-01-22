<template>
  <div class="number-block flex ai-center">
    <div class="name" v-if="label">{{ label }}：</div>
    <div class="flex-1">
      <div class="li" v-for="(item, index) in numTxt" :key="index">
        <span :style="{ color: color ? color : '#027aff' }">{{ item }}</span>
      </div>
      <span class="ml-5" v-if="unit">{{ unit }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CtcNumber',
  props: {
    /**
     * 数值
     */
    num: {
      type: Number,
      default: 0,
      require: true
    },
    /**
     * 数字颜色
     */
    color: {
      type: String
    },
    /**
     * label 值
     */
    label: {
      type: String
    },
    /**
     * 单位
     */
    unit: {
      type: String
    }
  },
  computed: {
    numTxt() {
      return (this.num + '').split('')
    }
  }
}
</script>
<style lang="scss" scoped>
.number-block {
  .li {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    border-radius: 4px;
    padding: 0px 5px;
    margin-right: 3px;
    span {
      font-size: 18px;
    }
  }
}
</style>
