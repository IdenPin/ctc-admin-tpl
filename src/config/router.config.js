import Layout from '@/components/layouts/Index.vue'
import { stubFalse } from 'lodash'

/**
 * default-routes
 * 不需要登录，不需要经过权限验证，所有用户都可以访问
 * 路由配置模板格式
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * iframe: false                  判断是否是iframe内链
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
const defaultRoutes = [
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
          icon: 'el-icon-files'
        }
      }
    ]
  },
  /**
   * 用于 iframe 展示容器
   */
  {
    path: '/iframe',
    component: Layout,
    redirect: '/iframe/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'IframePage',
        component: () => import('@/components/globals/IframePage.vue')
      }
    ]
  },

  /**
   * iframe 内链demo
   */

  {
    path: 'https://idenpin.github.io/element-table/docs/#/',
    meta: {
      title: '报表内链',
      icon: 'el-icon-document-copy'
    },
    iframe: true
  },

  /**
   * 外链demo
   */
  {
    path: 'http://www.qq.com',
    meta: {
      title: '腾讯外链',
      icon: 'el-icon-brush'
    }
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
  }
]

/**
 * 白名单，不需要登录就可以访问
 */

const whiteListPath = ['/login', '/test']

/**
 * 路由模式
 */

const mode = 'hash'

/**
 * IS_DYNAMIC_ROUTES 是否启用动态路由
 * 动态路由：指的不但需要登录还要根据后台的角色或者路由树做权限过滤操作
 * 静态路由：只需要验证是否登录，本地所有的路由信息都可以访问（针对不需要获取菜单接口或者用户角色）
 */

export const IS_DYNAMIC_ROUTES = false

export default { whiteListPath, defaultRoutes, mode, IS_DYNAMIC_ROUTES }
