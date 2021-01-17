import router from '../router'
import Store from '../store'
import NProgress from 'nprogress'
import Config from '@/config'
import 'nprogress/nprogress.css'
import { setDocumentTitle } from '@/utils/tools'

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
  const toPath = to.path

  /**
   * 设置网站不同页面 title
   */

  setDocumentTitle(to.meta && to.meta.title)

  /**
   * 路由拦截判断
   */

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
      /**
       * 如果 IS_DYNAMIC_ROUTES 为 true
       * 需要获取后端权限接口
       * 则登录成功后需要请求后端接口获取角色或者路由树
       */

      if (Config.router.IS_DYNAMIC_ROUTES) {
        Store.dispatch('user/fetchMenu').then(data => {
          router.addRoutes(data)
          router.options.routes.push(...data)
          console.log('---后台返回的权限信息----', data)
          if (Store.getters['user/menu'].length === 0) {
            Store.commit('user/SET_MENU', router.options.routes)
          }
        })
      } else {
        /**
         * 防止重复 push
         */

        if (Store.getters['user/menu'].length === 0) {
          Store.commit('user/SET_MENU', router.options.routes)
        }
      }
    }
    next()
  }
})

/**
 * 全局后置守卫
 */

router.afterEach((to, from, next) => {
  NProgress.done()
})
