<template>
  <div :class="appMain">
    <!-- 顶部 header -->
    <layout-header class="ctc-layout-header" />
    <!-- 顶部菜单 -->
    <layout-menu class="ctc-layout-aside" key="top-menu" mode="horizontal" :isTopMenu="topMenu" />
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
    <!-- 系统设置 -->
    <right-drawer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LayoutMenu from '@/components/layouts/menu/Index.vue'
import LayoutHeader from '@/components/layouts/Header.vue'
import LayoutFooter from '@/components/layouts/Footer.vue'
import RightDrawer from '@/components/layouts/RightDrawer.vue'

export default {
  name: 'AppMain',
  components: {
    LayoutMenu,
    LayoutHeader,
    LayoutFooter,
    RightDrawer
  },
  computed: {
    ...mapGetters({
      isCollapse: 'app/isCollapse',

      // 导航模式 顶部导航：true, 侧边栏导航： false
      isTopMenu: 'app/isTopMenu',
      isFixedLayoutHeader: 'app/isFixedLayoutHeader',
      isFixedLayoutSidebar: 'app/isFixedLayoutSidebar',
      isFixedLayoutPage: 'app/isFixedLayoutPage'
    })
  },
  created() {
    this.mixinStyleFn()
  },
  data() {
    return {
      fixedHeader: true,
      fixedAside: true, //关联[互斥]
      showFooter: false,
      topMenu: false //关联[互斥]
    }
  },
  methods: {
    mixinStyleFn() {
      this.appMain = [
        'ctc-app-main',
        this.fixedHeader && 'ctc-layout-header-fixed',
        this.fixedHeader && this.fixedAside && 'ctc-layout-aside-fixed',
        this.showFooter && 'ctc-layout-footer-show',
        this.topMenu && 'ctc-layout-aside-top'
      ]
    }
  }
}
</script>
<style lang="scss">
$spaceWidth: 12px;

.ctc-app-main {
  .el-menu-item,
  .el-submenu__title {
    padding: 0;
    line-height: 38px;
    height: 38px;
    &:hover {
      background-color: #f5faff;
    }
  }
  .nest-menu {
    .el-menu-item {
      line-height: 38px;
      height: 38px;
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
      width: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
      transition: all 0.2s ease;

      .ctc-layout-page {
        flex: auto;
        margin: $spaceWidth;
        min-height: calc(100vh - #{$headerHeight} - #{$spaceWidth * 2});
        // min-height: calc(100vh - #{$headerHeight} - #{$footerHeight} - #{$spaceWidth * 2} - 10px);
      }

      // 页底
      .ctc-layout-footer {
        color: #acb0b9;
        text-align: center;
        line-height: $footerHeight;
        flex: 0 0 auto;
        margin-bottom: 10px;
        display: none;
      }
    }
  }
}

// 置顶header
.ctc-layout-header-fixed {
  .ctc-layout-header {
    position: fixed;
    top: 0;
    z-index: 9;
    width: 100%;
  }
  .ctc-layout-main {
    margin-top: $headerHeight;
  }
}

// 固定侧边栏
.ctc-layout-aside-fixed {
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
  }
  .collapse-open + .ctc-layout-content {
    margin-left: $sidebarMaxWidth;
  }
  .collapse-close + .ctc-layout-content {
    margin-left: $sidebarMinWidth;
  }
}

// footer 页脚是否展示
.ctc-layout-footer-show {
  .ctc-layout-page {
    min-height: calc(100vh - #{$headerHeight} - #{$footerHeight} - #{$spaceWidth * 2} - 10px) !important;
  }
  .ctc-layout-footer {
    display: block !important;
  }
}

// menu 指定
.ctc-layout-aside-top {
  .ctc-layout-header {
    & + .ctc-layout-aside {
      display: block;
      width: 100% !important;
      .menu-wrapper > li {
        i {
          display: none;
        }
        i.el-icon-arrow-down {
          display: block;
        }
        span {
          margin-right: 20px;
          vertical-align: bottom;
        }
      }
    }
  }
  .ctc-layout-main {
    margin-top: 100px;
    .ctc-layout-aside {
      display: none;
    }
    .ctc-layout-content {
      margin-left: 0;
      .ctc-layout-page {
        min-height: calc(100vh - #{$headerHeight} - #{$footerHeight} - #{$spaceWidth * 2} - 10px - 60px) !important;
      }
    }
  }
}
</style>
