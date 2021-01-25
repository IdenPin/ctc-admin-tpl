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

/**
 * constant-routes
 * 需要用户登录才可以访问的路由，所有登录后的用户都可见，不做角色区分
 * 路由配置模板格式
 * Note: sub-menu only appear when route children.length >= 1
 */

import NestedRoutes from './modules/nested-routes'
import Layout from '@/components/layouts/Index.vue'

/**
 * devTemp 只在开发环境生效
 */
const devTemp = [
  {
    path: '/demo',
    meta: {
      title: 'Demo 示例',
      icon: 'el-icon-files'
    },
    component: () => import('@/views/demo/index.vue')
  }
]

/**
 * base 基础路由
 */
const base = [
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
    meta: {
      title: '首页',
      icon: 'el-icon-files'
    },
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
  // {
  //   path: '/demo',
  //   component: Layout,
  //   redirect: '/demo/index',
  //   children: [
  //     {
  //       path: 'index',
  //       meta: {
  //         title: 'Demo 示例',
  //         icon: 'el-icon-files'
  //       },
  //       component: () => import('@/views/Demo.vue')
  //     }
  //   ]
  // },
  {
    path: '/testRoute',
    hidden: true,
    component: () => import('@/components/globals/BlankPage.vue'),
    meta: {
      title: '测试路由',
      icon: 'el-icon-files'
    }
  },
  /**
   * 用于 iframe 展示容器
   */
  {
    path: '/_',
    component: Layout,
    redirect: '/_/index',
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
  }
]
process.env.NODE_ENV === 'development' && base.push(...devTemp)
export const baseRoutes = base

/**
 * 通过权限过滤动态添加的路由（非菜单树）
 * 注意，默认导出的是对象，如果是数组需要使用扩展运算符 ...
 * 路由配置按照本地访问的标准路由配置，一层路由需要添加 Layout index 层
 */

export const constantRoutes = [
  ...baseRoutes,
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
      roles: ['admin'],
      title: '腾讯外链',
      icon: 'el-icon-brush'
    }
  },

  {
    path: '/system-manage',
    component: Layout,
    children: [
      {
        path: 'index',
        meta: {
          title: '系统管理',
          icon: 'el-icon-brush'
        },
        component: () => import('@/views/SystemManage.vue')
      }
    ]
  },
  /**
   * 嵌套菜单
   */
  NestedRoutes,
  {
    path: '/user-manage',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'menu-icon3',
      roles: ['admin']
    },
    alwaysShow: true,
    redirect: '/user-manage/index',
    children: [
      {
        path: 'index',
        meta: {
          title: '列表',
          icon: 'menu-icon4'
        },
        component: () => import('@/views/UserInfo.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]
