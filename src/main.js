import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/icons'
import Element from 'element-ui'
import '@/assets/styles/theme/index.css'
import ElTableBlock from '@pdeng/element-table'
import GlobalComponents from '@/components/globals'

// 导入全局组件
Vue.use(GlobalComponents)
Vue.use(Element, { size: 'small' })
Vue.use(ElTableBlock)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
