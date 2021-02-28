/**
 * 路由配置文件入口
 */

import Vue from 'vue'
import Router from 'vue-router'
import Config from '@/config'
import Routes from './routes'

Vue.use(Router)

// 允许路由重复点击
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () =>
  new Router({
    base: Config.project.publicPath,
    mode: Config.router.mode,
    scrollBehavior: () => ({ y: 0 }),
    routes: Routes
  })

const router = createRouter()

/**
 * 重置路由hack方法
 * Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 */

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
