<template>
  <div>
    <el-container class="layout-container">
      <Header />
      <el-container>
        <Aside/>
        <el-main class="layout-content">
          <router-view/>
        </el-main>
      </el-container>
      <Footer/>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.layout-container{
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

<script>
import Header from './Header'
import Aside from './Aside'
import Footer from './Footer'
export default {
  components: {
    Header,
    Aside,
    Footer
  }
}
</script>
