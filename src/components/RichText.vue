<template>
  <div class="rich-text">
    <quill-editor ref="myQuillEditor" v-bind="$attrs" v-on="$listeners">
    </quill-editor>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor /* { default global options } */)
export default {
  name: 'RichText'
}
</script>
<style lang="scss" scoped>
</style>
