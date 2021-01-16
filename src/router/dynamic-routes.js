/**
 * dynamic-routes file <核心>
 * 根据权限树或者角色动态生成的路由
 */
import Layout from '@/components/layouts/Index.vue'
import NestedRoute from './modules/nested-routes'
import OtherRoute from './modules/other-routes'

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
  // 嵌套路由
  NestedRoute,
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
