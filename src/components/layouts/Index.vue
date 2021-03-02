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
        <template v-if="isNeedNavView">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="$store.state.navView.cachedViews">
              <router-view class="ctc-layout-page" :key="$route.path" />
            </keep-alive>
          </transition>
        </template>
        <transition name="fade-transform" mode="out-in" v-else>
          <route-node />
        </transition>
        <!-- <layout-footer class="ctc-layout-footer" /> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LayoutMenu from '@/components/layouts/menu/Index.vue'
import LayoutHeader from '@/components/layouts/Header.vue'
// import LayoutFooter from '@/components/layouts/Footer.vue'
import { isNeedNavView } from '@/config/router.config'
import RouteNode from '@/components/globals/RouteNode'

export default {
  name: 'AppMain',
  data() {
    return { isNeedNavView }
  },
  components: {
    RouteNode,
    LayoutMenu,
    LayoutHeader
    // LayoutFooter
  },
  computed: {
    ...mapGetters({
      isCollapse: 'app/isCollapse'
    })
  }
  // methods: {
  //   handleResize() {
  //     const isMobile = document.body.getBoundingClientRect().width - 1 < 992
  //     isMobile ? this.$store.commit('app/TOGGLE_COLLAPSE', true) : this.$store.commit('app/TOGGLE_COLLAPSE', false)
  //   }
  // },
  // beforeMount() {
  //   window.addEventListener('resize', this.handleResize)
  // },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.handleResize)
  // }
}
</script>
<style lang="scss">
$spaceWidth: 12px;
$height: 40px;

/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.ctc-app-main {
  .el-menu-item,
  .el-submenu__title {
    padding: 0;
    line-height: $height;
    height: $height;
    &:hover {
      background-color: #f5faff;
      color: $mainColor;
    }
  }

  .el-menu-item.is-active {
    color: $mainColor;
    background-color: #f5faff;
  }

  .nest-menu {
    .el-menu-item {
      line-height: $height;
      height: $height;
      &:hover {
        color: $mainColor;
        background-color: #f5faff;
      }
    }
  }

  // 顶部页头容器
  .ctc-layout-header {
    background-color: $topHeaderColor;
    height: $headerHeight !important;
    z-index: 99;
    padding: 0 10px;
    & + .ctc-layout-aside {
      display: none;
    }
  }

  // 下侧整个容器
  .ctc-layout-main {
    display: flex;

    // 左侧侧边栏容器
    .el-menu,
    .ctc-layout-aside {
      width: 100%;
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }

    .ctc-layout-aside {
      background-color: #fff;
      border-right: 1px solid $borderGrey;
      color: #555b6a;
      .el-scrollbar {
        overflow-y: auto;
        height: calc(100vh - #{$headerHeight});
      }
    }

    .collapse-open {
      flex: 0 0 $sidebarMaxWidth;
      max-width: $sidebarMaxWidth;
      min-width: $sidebarMaxWidth;
      width: $sidebarMaxWidth;
      // min-height: calc(100vh - #{$headerHeight});
    }
    .collapse-close {
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
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      overflow: hidden;
      width: 100%;
      .ctc-layout-page {
        flex: auto;
        overflow-y: auto;
        // width: calc(100% - #{$spaceWidth} * 2);
        // margin: $spaceWidth $spaceWidth 0;
        height: calc(100vh - #{$headerHeight});
        // min-height: calc(100vh - #{$headerHeight} - #{$footerHeight} - #{$spaceWidth * 2});
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
  z-index: 2;
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
