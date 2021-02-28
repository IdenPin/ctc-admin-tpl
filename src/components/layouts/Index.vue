<template>
  <div class="ctc-app-main">
    <!-- 顶部 header -->
    <layout-header class="ctc-layout-header" />
    <!-- main 主区域 -->
    <div class="ctc-layout-main">
      <!-- 左侧边栏 -->
      <layout-menu
        :class="['ctc-layout-aside', isCollapse ? 'collapse-close' : 'collapse-open']"
        mode="vertical"
        key="right-menu"
      />
      <!-- 右侧区域 -->
      <div class="ctc-layout-content">
        <route-node class="ctc-layout-page"></route-node>
        <layout-footer class="ctc-layout-footer" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LayoutMenu from '@/components/layouts/menu/Index.vue'
import LayoutHeader from '@/components/layouts/Header.vue'
import LayoutFooter from '@/components/layouts/Footer.vue'

export default {
  name: 'AppMain',
  components: {
    LayoutMenu,
    LayoutHeader,
    LayoutFooter
  },
  computed: {
    ...mapGetters({
      isCollapse: 'app/isCollapse'
    })
  },
  methods: {
    handleResize() {
      const isMobile = document.body.getBoundingClientRect().width - 1 < 992
      isMobile ? this.$store.commit('app/TOGGLE_COLLAPSE', true) : this.$store.commit('app/TOGGLE_COLLAPSE', false)
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style lang="scss">
$spaceWidth: 12px;
$height: 40px;

.ctc-app-main {
  .el-menu-item,
  .el-submenu__title {
    padding: 0;
    line-height: $height;
    height: $height;
    &:hover {
      background-color: #f5faff;
    }
  }

  .el-menu-item.is-active {
    background-color: #f5faff;
  }

  .nest-menu {
    .el-menu-item {
      line-height: $height;
      height: $height;
      &:hover {
        background-color: #f5faff;
      }
    }
  }

  // 顶部页头容器
  .ctc-layout-header {
    // min-width: $minWidth;
    background-color: $topHeaderColor;
    height: $headerHeight !important;
    padding: 0 10px;
    & + .ctc-layout-aside {
      display: none;
    }
  }

  // 下侧整个容器
  .ctc-layout-main {
    display: flex;

    // 左侧侧边栏容器
    .ctc-layout-aside {
      background-color: $topHeaderColor;
      border-right: 1px solid $borderGrey;
      color: #333;
      // transition: all 0.5s ease;
      .el-scrollbar {
        overflow-y: auto;
        height: 100vh;
      }
    }

    .collapse-open {
      flex: 0 0 $sidebarMaxWidth;
      max-width: $sidebarMaxWidth;
      min-width: $sidebarMaxWidth;
      width: $sidebarMaxWidth;
      // min-height: calc(100vh - #{$headerHeight});
    }
    .collapse-min {
      flex: 0 0 $sidebarMinWidth;
      max-width: $sidebarMinWidth;
      min-width: $sidebarMinWidth;
      width: $sidebarMinWidth;
      // min-height: calc(100vh - #{$headerHeight});
    }

    // 右侧内容布局容器
    .ctc-layout-content {
      background: $bgGrey;
      display: flex;
      flex-direction: column;
      transition: all 0.2s ease;
      min-height: 100vh;
      overflow-x: hidden;
      width: 100%;
      .ctc-layout-page {
        flex: auto;
        // width: calc(100% - #{$spaceWidth} * 2);
        // margin: $spaceWidth $spaceWidth 0;
        min-height: calc(100vh - #{$headerHeight} - #{$spaceWidth * 2});
        // min-height: calc(100vh - #{$headerHeight} - #{$footerHeight} - #{$spaceWidth * 2} - 10px);
      }
    }
  }
}

// 置顶header
.ctc-layout-header {
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
}
.ctc-layout-main {
  margin-top: $headerHeight;
}

// 固定侧边栏
.ctc-layout-aside {
  position: fixed;
  left: 0;
  bottom: 0;
  top: $headerHeight;
}
.collapse-close {
  .el-submenu__title {
    i.el-submenu__icon-arrow,
    span {
      display: none;
    }
  }
  .collapse {
    text-align: center;
  }
}

.collapse-open + .ctc-layout-content {
  margin-left: $sidebarMaxWidth;
}
.collapse-close + .ctc-layout-content {
  margin-left: $sidebarMinWidth;
}
</style>
