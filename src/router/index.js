/**
 * 路由配置文件入口
 */

import Vue from 'vue'
import Router from 'vue-router'
import Config from '@/config'

import constantRoutes from './constant-routes'
import dynamicRoutes from './dynamic-routes'

Vue.use(Router)

/**
 * 解决路由跳转 bug
 * Navigation cancelled from "/system-manage/index" to "/assign-document/index" with a new navigation
 */

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/**
 *  通过 IS_DYNAMIC_ROUTES 确定该项目菜单权限系统是静态的还是动态的
 */
const routes = Config.router.IS_DYNAMIC_ROUTES ? dynamicRoutes : constantRoutes
console.log('routes', routes)
const createRouter = () =>
  new Router({
    mode: Config.router.mode,
    scrollBehavior: () => ({ y: 0 }),
    routes
  })

const router = createRouter()

/**
 * 重置路由hack方法
 * Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
