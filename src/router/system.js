export default {
  path: '/system',
  name: 'System',
  component: () => import('@/components/Layout/index'),
  redirect: '/system/user',
  meta: {
    title: '系统管理',
    icon: 'password'
  },
  children: [
    {
      path: 'user',
      name: 'SystemUser',
      meta: { title: '用户管理', icon: 'ball', noCache: true },

      component: () => import('@/views/system/User')
    },
    {
      path: 'role',
      name: 'SystemRole',
      meta: { title: '角色管理', icon: 'ball', noCache: true },

      component: () => import('@/views/system/Role')
    },
    {
      path: 'menu',
      name: 'SystemMenu',
      component: () => import('@/views/system/Menu'),
      meta: { title: '菜单管理', icon: 'ball', noCache: true }

    },
    {
      path: 'manage',
      name: 'SystemManage',
      component: () => import('@/views/system/Manage'),
      meta: { title: '组织管理', icon: 'ball', noCache: true }

    }
  ]
}
