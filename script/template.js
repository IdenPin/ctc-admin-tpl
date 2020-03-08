module.exports = {
  vueTemplate: componentName => {
    return `<template>
  <div>
    ${componentName}组件
  </div>
</template>
<script>
export default {
  name: '${componentName}',
  data () {
    return {}
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>

</style>
`
  },
  entryTemplate: `export default {}
`
}
