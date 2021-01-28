<template>
  <span class="ctc-divider" v-on="$attrs" :class="parentClass">
    <el-divider :direction="dir" :content-position="$attrs['content-position']">
      <slot />
    </el-divider>
  </span>
</template>

<script>
export default {
  name: 'CtcDivider',
  inheritAttrs: false,
  computed: {
    /**
     * direction 分割线方向 水平 h, 垂直 v
     */
    dir() {
      const dir = (this.$attrs.direction || 'horizontal').toLowerCase()
      if (dir === 'h') {
        return 'horizontal'
      } else if (dir === 'v') {
        return 'vertical'
      } else {
        return dir
      }
    },
    parentClass() {
      const size = this.$attrs['size']
      return size ? 'divider-space-' + size : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.el-divider {
  background-color: #e9ecf1;
}
// default
.el-divider--horizontal {
  margin: 24px 0;
}
.el-divider--vertical {
  margin: 0 12px;
}

// medium
.divider-space-medium {
  .el-divider--horizontal {
    margin: 30px 0;
  }
}

// smal
.divider-space-small {
  .el-divider--horizontal {
    margin: 10px 0;
  }
}

// mini
.divider-space-mini {
  .el-divider--horizontal {
    margin: 5px 0;
  }
}
</style>
