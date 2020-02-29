<template>
  <el-header class="layout-header">
    <div class="container">
      <div class="logo" :style="{'width': !$store.state.isOpenAside ? '254px' : '63px'}">LOGO</div>
      <div class="header-right">
        <div class="collapse" @click="$store.commit('changeAsideStatue')">
          <i class="el-icon-s-fold" v-if="$store.state.isOpenAside" style="font-size: 24px;"></i>
          <i class="el-icon-s-unfold" v-else style="font-size: 24px;"></i>
        </div>
        <div class="user">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </div>
      </div>
    </div>
  </el-header>
</template>
<script>
// export default {
//   methods: {
//     togglesideMenu () {
//       alert(1)
//     }
//   }
// }
</script>
<style lang="scss" scoped>
.layout-header{
  font-size: 12px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  background-color: #fff;
  color: #333;
  height: $headerHeight!important;
  padding: 0!important;
  // border-bottom: 1px solid $borderGrey!important;
  .container{
    display: flex;
    .logo{
      height: $headerHeight;
      line-height: $headerHeight;
      border-right: 1px solid $borderGrey;
    }
    .header-right{
      padding-left: 20px;
      padding-right: 20px;
      flex: 1;
      .user{
        float: right;
        line-height: $headerHeight;
      }
      .collapse{
        margin-top:20px;
        cursor: pointer;
        float: left;
      }
    }
  }
}
</style>
