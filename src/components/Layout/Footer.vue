<template>
  <el-footer v-if="isShowFooter">
    <svg-icon icon-class="write"/>
  </el-footer>
</template>
<script>
export default {
  data () {
    return {
      isShowFooter: false
    }
  }
}
</script>
