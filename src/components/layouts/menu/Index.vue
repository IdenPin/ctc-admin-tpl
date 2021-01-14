<template>
  <el-aside :style="{ width: isCollapse && !isTopMenu ? variables.sidebarMinWidth : variables.sidebarMaxWidth }">
    <!-- 折叠触发点 -->
    <div class="collapse" @click="$store.commit('app/TOGGLE_COLLAPSE')">
      <svg-icon icon-class="toggle-right" v-if="isCollapse"></svg-icon>
      <svg-icon icon-class="toggle-left" v-else></svg-icon>
    </div>
    <el-menu
      :default-active="activeMenu"
      :class="['el-menu-vertical', $attrs.mode === 'horizontal' ? 'flex' : '']"
      :collapse="isCollapse"
      :unique-opened="false"
      :collapse-transition="false"
      router
      :mode="$attrs.mode"
    >
      <sub-menu v-for="route in $store.getters['user/menu']" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-aside>
</template>
<script>
import { mapGetters } from 'vuex'
import variables from '@/assets/styles/_variables.scss'
import SubMenu from '@/components/layouts/menu/SubMenu.vue'

export default {
  components: {
    SubMenu
  },
  props: {
    isTopMenu: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      isCollapse: 'app/isCollapse'
    }),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  },
  mounted() {
    console.log('侧边栏菜单', this.$store.getters['user/menu'])
  }
}
</script>
<style lang="scss" scoped>
// .ctc-layout-aside-fixed {
//   .el-menu-vertical:not(.el-menu--collapse) {
//     width: 200px;
//     min-height: calc(100vh - #{$headerHeight} - 28px);
//   }
// }
.ctc-layout-aside-top {
  .collapse {
    display: block;
  }
}
.collapse {
  background-color: #fff;
  // border-right: solid 1px #e6e6e6;
  cursor: pointer;
  padding: 5px 12px;
  text-align: right;
  .svg-icon {
    font-size: 18px;
  }
}
</style>
