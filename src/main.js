import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Config from './config'
import './config/permission.config'
/**
 * 安装自定义及第三方组件
 */
Config.install(Vue)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
