/**
 * 路由配置文件入口
 */

import Vue from 'vue'
import Router from 'vue-router'
import Config from '@/config'
import { baseRoutes } from './constant-routes'

Vue.use(Router)

/**
 * 解决路由跳转 bug
 * Navigation cancelled from "/xxx" to "/xxxx" with a new navigation
 */

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () =>
  new Router({
    mode: Config.router.mode,
    scrollBehavior: () => ({ y: 0 }),
    routes: baseRoutes
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
