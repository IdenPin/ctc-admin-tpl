import Store from '@/store'
import Router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setPageTitle } from '@@/utils'
NProgress.configure({ showSpinner: true })
const whiteRouterArray = ['/login', '/demo']
Store.dispatch('fetchMenu')
Router.beforeEach((to, from, next) => {
  NProgress.start()
  setPageTitle(to.meta.title || '') // 设置title
  if (Store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteRouterArray.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
  next()
})

Router.afterEach(() => {
  NProgress.done()
})
