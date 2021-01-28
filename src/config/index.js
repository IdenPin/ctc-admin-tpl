import Element from 'element-ui'
import '@/assets/styles/theme/index.css'
import ElTableBlock from '@pdeng/element-table'
import '@/assets/icons'
import QuestionDrawer from '@/components/biz/question-drawer'

import GlobalComponents from '@/components/globals'
import '@/directives'
import Bus from '@/utils/bus'

import router from './router.config'
import net from './net.config'
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
  Vue.prototype.$questionDrawer = QuestionDrawer
}

export default { install, router, net, project }
