import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入业务路由
import System from './system'
import Eco from './eco/index'
import Log from './log'

Vue.use(VueRouter)

// 前端没有权限的路由
const CONST_ROUTER = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/components/Layout/index'),
    redirect: '/',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home')
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('@/views/List')
      }
    ]
  },
  System,
  Eco,
  Log
]

// 后台接口请求返回的路由
const ASYNC_ROUTER = [
  {
    path: '/about',
    name: 'About',
    component: () => import('@/components/Layout/index'),
    children: [
      {
        path: '/about',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About')
      }
    ]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  }
]
const routes = [...CONST_ROUTER, ...ASYNC_ROUTER]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
