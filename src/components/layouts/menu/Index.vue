<template>
  <div>
    <div class="collapse" @click="$store.commit('app/TOGGLE_COLLAPSE', !isCollapse)">
      <i :class="`el-icon-s-${isCollapse ? 'fold' : 'unfold'}`" style="font-size: 16px;color:#7b7c7d"></i>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <sub-menu v-for="route in permissionRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import variables from '@/assets/styles/_variables.scss'
import SubMenu from '@/components/layouts/menu/SubMenu.vue'

export default {
  components: {
    SubMenu
  },
  computed: {
    ...mapGetters({
      permissionRoutes: 'user/menu',
      isCollapse: 'app/isCollapse'
    }),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.collapse {
  background-color: #fff;
  cursor: pointer;
  padding: 5px 12px;
  text-align: right;
}
</style>
