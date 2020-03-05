<template>
  <el-aside
    id="layout-aside"
    :width="sidebar ? '64px' : '211px'"
    >
      <el-menu
        :default-active="activeMenu"
        :collapse="sidebar"
        :unique-opened="false"
        :collapse-transition="false"
        active-text-color="#0170fe"
        router
        mode="vertical"
        class="el-menu-aside">
          <sidebar-item v-for="route in menu" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
  </el-aside>
</template>
<script>
import { mapGetters } from 'vuex'
import { isExternal } from '@@/utils/validate'
import SidebarItem from './SidebarItem'
import FixiOSBug from './FixiOSBug'
import path from 'path'
export default {
  components: {
    SidebarItem
  },
  mixins: [FixiOSBug],
  data () {
    return {
      onlyOneChild: null
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'device', 'menu']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu-aside:not(.el-menu--collapse) {
  width: 210px;
  min-height: 400px;
}
#layout-aside {
  color: #333;
  background-color: #fff;
  border-right: 1px solid $borderGrey!important;
  .el-menu {
    border-right: none;
    .el-menu-item [class^=el-icon-],
    .el-submenu [class^=el-icon-]{
      position: relative;
      top: -2px;
    }
  }
}
</style>
