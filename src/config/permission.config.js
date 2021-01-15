import router from '../router'
import Store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Config from '@/config'

/**
 * NProgress 配置
 */
NProgress.configure(Config.project.nProgress)

/**
 * 全局前置守卫，路由拦截
 */

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = Store.getters['user/token']

  /**
   * 路由拦截判断
   */
  const toPath = to.path
  if (!token) {
    /**
     * token 不存在且访问的地址不在白名单里面
     */

    if (Config.router.whiteListPath.indexOf(toPath) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  } else {
    /**
     * 如果 token 存在又访问登录界面，则重定向到首页
     */
    if (toPath === '/login') {
      next('/')
      NProgress.done()
    } else {
      next()
    }
  }
})

/**
 * 全局后置守卫
 */

router.afterEach((to, from, next) => {
  NProgress.done()
})
