<template>
  <div :class="['number-block', 'flex', 'ai-center', size]">
    <i v-if="icon" class="el-icon-caret-right"></i>
    <div class="name" v-if="label">{{ label }}</div>
    <div class="flex-1" v-if="num !== null && num !== undefined">
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
      type: Number
    },
    /**
     * 数字颜色
     */
    color: {
      type: String
    },
    /**
     * 大小
     * medium, small, mini
     */
    size: {
      type: String,
      default: 'small'
    },
    /**
     * label 值
     */
    label: {
      type: String
    },
    /**
     * label 值
     */
    icon: {
      type: Boolean,
      default: false
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
  .name {
    margin-right: 5px;
  }
  .li {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-right: 3px;
  }
}

.medium {
  .name {
    font-size: 14px;
  }
  .li {
    padding: 0px 6px;
    margin-right: 5px;
    span {
      font-size: 22px;
    }
  }
}
.small {
  .name {
    font-size: 13px;
  }
  .li {
    padding: 0px 5px;
    span {
      font-size: 18px;
    }
  }
}
.mini {
  .li {
    padding: 0px 3px;
    span {
      font-size: 14px;
    }
  }
}
</style>
