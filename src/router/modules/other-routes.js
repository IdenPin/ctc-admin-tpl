import Layout from '@/components/layouts/Index.vue'

export default [
  {
    path: '/testRoute',
    hidden: true,
    component: () => import('@/components/globals/BlankPage.vue'),
    meta: {
      title: '测试路由',
      icon: 'el-icon-files'
    }
  },
  {
    path: 'https://idenpin.github.io/element-table/docs/#/',
    meta: {
      title: '报表内链',
      icon: 'el-icon-document-copy'
    },
    iframe: true
  },
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
    redirect: '/system-manage/index',
    name: 'systemManege',
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '系统管理',
          icon: 'el-icon-brush'
        },
        component: () => import('@/views/SystemManage.vue')
      }
    ]
  },
  {
    path: '/user-manage',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'menu-icon3',
      roles: ['admin']
    },
    redirect: '/user-manage/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '列表',
          icon: 'menu-icon4'
        },
        component: () => import('@/views/UserInfo.vue')
      }
    ]
  }
]
