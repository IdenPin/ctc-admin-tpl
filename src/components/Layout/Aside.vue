<template>
<!-- :class="{
      'mobile': device === 'mobile' ? true : false,
      'open': sidebar ? true : false,
      'close': !sidebar ? true : false
      }" -->
  <el-aside
    id="layout-aside"
    :width="sidebar ? '64px' : '255px'"

    >
      <el-menu
        default-active="2"
        :collapse="sidebar"
        unique-opened
        :collapse-transition="false"
        class="el-menu-aside">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
  </el-aside>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['sidebar', 'device'])
  }
}
</script>
<style lang="scss" scoped>
.el-menu-aside:not(.el-menu--collapse) {
  width: 255px;
  min-height: 400px;
}
.mobile{
  display: none;
  // &.open{
  //   position: fixed;
  //   width: 255px!important;
  //   z-index: 9999;
  //   top: 0;
  //   display: block;
  // }
}
.open{
  // width: 255px!important;
}
.close{
  // width: 64px!important;
}
#layout-aside {
  color: #333;
  background-color: #fff;
  border-right: 1px solid $borderGrey!important;
  .el-menu {
    border-right: none;
  }
}
</style>
