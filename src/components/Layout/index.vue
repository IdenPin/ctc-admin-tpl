<template>
  <div>
    <el-container class="app-main">
      <Header />
      <el-container>
        <Aside/>
        <el-main class="layout-content">
            <div class="main-wrapper">
              <router-view/>
            </div>
        </el-main>
      </el-container>
      <Footer/>
    </el-container>
  </div>
</template>
<script>
import Header from './Header'
import Aside from './Aside/index'
import Footer from './Footer'
import ResizeHandler from '@/mixin/resizeHandler'
export default {
  name: 'Layout',
  mixins: [ResizeHandler],
  components: {
    Header,
    Aside,
    Footer
  }
}
</script>
<style lang="scss" scoped>
.app-main{
  margin-top: $headerHeight;
  border: 1px solid #eee;
  border-bottom: none;
  height: calc(100vh - #{$headerHeight});
  .layout-content{
    padding: $spaceSize;
    background-color: $bgGrey;
  }
}
</style>
