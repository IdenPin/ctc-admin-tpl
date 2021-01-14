export default function(Vue) {
  const contexts = require.context('@/components/globals/', true, /\.vue$/)
  contexts.keys().forEach(v => {
    const item = contexts(v).default
    Vue.component(item.name, item)
  })
}
