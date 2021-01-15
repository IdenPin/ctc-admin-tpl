/**
 * default-routes 默认路由文件
 * 不需要经过权限验证，所有用户都可以访问
 */

import Layout from '@/components/layouts/Index.vue'
import TestRouteLevel from './modules/test-route-level'
import OtherRoute from './modules/other-route'

export default [
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/Login.vue')
  },

  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-house'
        }
      }
    ]
  },
  TestRouteLevel,
  ...OtherRoute,
  {
    path: '/404',
    component: Layout,
    redirect: '/404/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/404.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]
