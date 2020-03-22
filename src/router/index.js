import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout/index'
// 导入业务路由
// import System from './system'
// import Eco from './eco/index'
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
    children: [
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
  },
  {
    path: '/about',
    name: 'About',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/About.vue'),
        meta: {
          title: '关于',
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
    children: [
      {
        path: '/404',
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
  // Eco,
  // Log,
  // System,
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'index',
  //       component: () => import('@/views/About.vue'),
  //       meta: {
  //         title: '关于',
  //         icon: 'table'
  //       }
  //     }
  //   ]
  // }
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
