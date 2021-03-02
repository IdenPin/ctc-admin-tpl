<template>
  <div v-loading.lock="loading">
    <iframe v-if="urlPath" :src="urlPath" class="iframe" ref="iframe"></iframe>
  </div>
</template>

<script>
export default {
  name: 'IframePage',
  data() {
    return {
      loading: false,
      urlPath: null
    }
  },
  created() {
    const { src } = this.$route.query
    this.urlPath = src && decodeURIComponent(src)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loading = true
    })
  },
  mounted() {
    this.iframeInit()
    window.onresize = () => {
      this.iframeInit()
    }
  },
  methods: {
    iframeInit() {
      const iframe = this.$refs.iframe
      const clientHeight = document.documentElement.clientHeight - 44
      iframe.style.height = `${clientHeight}px`
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.loading = false
        })
      } else {
        iframe.onload = () => {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style>
.iframe {
  width: 100%;
  height: 100vh;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
