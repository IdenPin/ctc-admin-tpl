import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入业务路由
import System from './system'
import Eco from './eco/index'
import Log from './log'

Vue.use(VueRouter)

// 前端没有权限的路由
export const CONST_ROUTER = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {
      title: '首页',
      icon: 'table'
    }
  }
]

// 后台接口请求返回的路由
export const ASYNC_LOCAL_ROUTER = [
  Eco,
  Log,
  System,
  // {
  //   path: '/external-link',
  //   name: 'ExternalLink',
  //   meta: {
  //     title: 'External Link',
  //     icon: 'link'
  //   },
  //   component: () => import('@/components/Layout/index')
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404')
  },
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login')
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/components/Layout/index'),
      children: [...CONST_ROUTER]
    }
  ]
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
