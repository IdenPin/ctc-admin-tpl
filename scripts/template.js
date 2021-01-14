module.exports = {
  vueTemplate: componentName => {
    return `<template>
  <el-card shadow="never">
    ${componentName.split('.vue')[0]} 页面开发中 ...
  </el-card>
</template>
<script>
export default {
  name: '${componentName}',
  data() {
    return {}
  },
  mounted() {}
}
</script>
<style lang="scss" scoped></style>
`
  },
  entryTemplate: `export default {}
`
}
