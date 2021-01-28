<template>
  <div class="ctc-card" :style="{ width, background, color }">
    <div class="header">
      <div class="header-title">
        <slot name="header" v-if="$slots.header">
          待填入标题
        </slot>
        <template v-else>
          {{ title }}
        </template>
      </div>
      <div class="handle-opt" v-if="handleOpt">
        <i
          :class="[isOpen ? 'el-icon-s-fold' : 'el-icon-s-unfold']"
          v-if="handleOpt === 'toggleOpen'"
          @click="openOrCloseFn"
        ></i>
        <i
          :class="['el-icon-d-arrow-left', isOpen ? 'is-open' : 'is-close']"
          v-if="handleOpt === 'toggleCollspan'"
          @click="toggleBodyFn"
        ></i>
      </div>
    </div>
    <div class="body" ref="collspan-container" v-if="isOpen">
      <slot> 待填入内容 </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CtcCard',
  props: {
    width: {
      type: String,
      default: '370px'
    },
    background: {
      type: String,
      default: '#fbfbfc'
    },
    color: {
      type: String,
      default: '#606266'
    },
    title: {
      type: String
    },
    /**
     * 可选 toggle 或 open
     */
    handleOpt: {
      type: String
    },
    /**
     * 模式是否展开
     */
    isCollSpan: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpen: this.isCollSpan
    }
  },
  methods: {
    /**
     * body 展示 或 隐藏
     */
    toggleBodyFn() {
      this.isOpen = !this.isOpen
    },
    /**
     * card 打开或关闭
     */
    openOrCloseFn() {
      this.toggleBodyFn()
      let _width
      this.isOpen ? (_width = this.width) : (_width = '50px')

      const headerDom = this.$el.querySelector('.header-title')
      if (this.isOpen) {
        _width = this.width
        headerDom.style.display = 'block'
      } else {
        _width = '60px'
        headerDom.style.display = 'none'
      }
      this.$el.style.width = _width
    }
  }
}
</script>
<style lang="scss" scoped>
.ctc-card {
  border-radius: 4px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.14);
  .header {
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    font-size: 13px;
    border-radius: 4px 4px 0 0;
    height: 38px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    .header-title {
      flex: 1;
      line-height: 36px;
      font-size: 15px;
      font-weight: 500;
    }
    .handle-opt {
      i {
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      i.is-open {
        transform: rotate(90deg);
      }
      i.is-close {
        transform: rotate(270deg);
      }
    }
  }
  .body {
    overflow: hidden;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 0 0 4px 4px;
    font-size: 13px;
    color: #606266;
    transition: all 0.3s ease;
    // border: 1px solid #ebeef5;
    border-top: none;
  }
}
</style>
