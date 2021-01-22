/**
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

import { baseRoutes } from './constant-routes'
import NestedRoutes from './modules/nested-routes'

/**
 * 注意，默认导出的是对象，如果是数组需要使用扩展运算符 ...
 * 如果是动态菜单，且走的是角色模式，则meta中必须配置 title 字段
 * 路由配置按照后台返回的菜单树一样，一层路由不需要添加 Layout index层
 */

const asyncRoutes = [
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

  /**
   * 嵌套菜单
   */
  NestedRoutes,
  {
    path: '/user-manage',
    component: () => import('@/views/UserInfo.vue'),
    meta: {
      title: '用户管理',
      roles: ['user'],
      icon: 'el-icon-brush'
    }
  },

  {
    path: '*',
    redirect: '/404'
  }
]

export default [...baseRoutes, ...asyncRoutes]
