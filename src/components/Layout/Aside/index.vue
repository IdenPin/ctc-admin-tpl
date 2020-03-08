<template>
    <el-aside
      class='layout-aside'
      :style= "{'width':(sidebar ? Number(variables.sidebarMinWidth - 1) + 'px' : Number(variables.sidebarMaxWidth) + 1 + 'px')}"
      :class="{
        'show-sidebar' : !sidebar ? true : false,
        'hide-sidebar' : sidebar ? true : false,
      }"
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
import variables from '@@/style/_variables.scss'
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
    },
    variables () {
      return variables
    }
  },
  mounted () {
    console.log('----', variables)
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
<style lang="scss">
.layout-aside{
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
  .menu-wrapper {
    .router-link-active{
      .el-submenu__title,
      .el-menu-item{
        background-color: #ecf5ff;
      }
    }
  }

}
.menu-wrapper{
  a{
    text-decoration: none!important;
  }
}

// .hide-sidebar{
//   width: #{$sidebarMinWidth + 'px'};
// }
// .show-sidebar{
//   width: #{$sidebarMaxWidth + 'px'};
//   // .menu-wrapper {
//   //   .svg-ico{
//   //     margin-right: 6px!important;
//   //   }
//   // }
// }
.hide-sidebar .el-submenu__title span,
.hide-sidebar .el-submenu__title .el-icon-arrow-right{
  display: none;
}
// .hide-sidebar ::v-deep {
//   .menu-wrapper {
//     svg.svg-ico{
//       margin-right: 0!important;
//     }
//   }
// }
</style>
