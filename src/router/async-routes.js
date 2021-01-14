/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
import TestRouteLevel from './modules/test-route-level'
import Layout from '@/components/layouts/Index.vue'
// import OtherRoute from './modules/other-route'
// export default [TestRouteLevel, ...OtherRoute]
export default [
  {
    path: '/user-info',
    name: 'UserInfo',
    component: Layout,
    redirect: '/user-info/index',
    children: [
      {
        path: 'index',
        name: 'UserInfoIndex',
        component: () => import('@/views/UserInfo.vue'),
        meta: {
          title: '个人信息'
        }
      }
    ]
  },
  TestRouteLevel
]
