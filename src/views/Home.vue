<template>
  <div class="home-wrap" v-loading="true">
    测试
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      test: ''
    }
  }
}
</script>
<style lang="scss">
.el-loading-spinner .circular {
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite;
  display: none;
}

.el-loading-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-loading-spinner {
    background: url(~@/assets/images/loading.gif) no-repeat;
    background-size: 40px 48px;
    height: 50px;
    width: 45px;
    .el-loading-text {
      margin: 40px 0;
    }
  }
}
</style>
