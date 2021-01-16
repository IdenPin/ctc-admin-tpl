import Element from 'element-ui'
import '@/assets/styles/theme/index.css'
import ElTableBlock from '@pdeng/element-table'
import '@/assets/icons'

import GlobalComponents from '@/components/globals'
import Bus from '@/utils/bus'

import router from './router.config'
import request from './request.config'
import project from './project.config'

export function install(Vue) {
  // 导入全局组件
  Vue.use(GlobalComponents)
  Vue.use(Element, {
    size: 'small'
  })
  Vue.use(ElTableBlock)

  Vue.config.productionTip = false
  Vue.prototype.$bus = Bus
}

export default { install, router, request, project }
