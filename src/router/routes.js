/*
 * iframe: false                  if set true, item will show iframe url
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

import Layout from '@/components/layouts/Index.vue'
import NestedRoutes from './modules/nested-routes'
import OtherRoutes from './modules/other-routes'
import { isNeedLogin } from '@/config/router.config'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-files'
        }
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    redirect: '/demo/index',
    children: [
      {
        path: 'index',
        meta: {
          title: '组件示例',
          icon: 'el-icon-files'
        },
        component: () => import('@/views/demo/index.vue')
      }
    ]
  },

  /**
   * 用于 iframe 展示容器
   */
  {
    path: '/view',
    component: Layout,
    redirect: '/view/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'IframePage',
        component: () => import('@/components/globals/IframePage.vue')
      }
    ]
  },

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

  ...OtherRoutes,
  NestedRoutes,

  {
    path: '*',
    redirect: '/404'
  }
]

isNeedLogin &&
  routes.unshift({
    path: '/login',
    hidden: true,
    component: () => import('@/views/Login.vue')
  })

export default routes
