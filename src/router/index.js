import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout/index'
// 导入业务路由
import System from './system'
import Eco from './eco/index'
// import Log from './log'

Vue.use(VueRouter)

// 前端没有权限的路由
export const CONST_ROUTER = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: {
          title: '首页',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    name: 'error',
    hidden: true,
    redirect: '/error/404',
    children: [
      {
        path: '404',
        name: 'Error404',
        meta: {
          title: '404',
          icon: '404'
        },
        component: () => import('@/views/error-page/404')
      }
    ]
  }
]

// 后台接口请求返回的路由
export const ASYNC_LOCAL_ROUTER = [
  Eco,
  System,
  {
    path: '/profile',
    name: 'Profile',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ProfileIndex',
        component: () => import('@/views/Profile.vue'),
        meta: {
          title: '关于',
          icon: 'table'
        }
      }
    ]
  }
  // Log,
]
const createRouter = () =>
  new VueRouter({
    mode: 'history',
    routes: CONST_ROUTER
  })
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
