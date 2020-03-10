export default {
  path: '/system',
  name: 'System',
  component: () => import('@/components/Layout/index'),
  redirect: '/system/user',
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/system/User')
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/system/Role')
    },
    {
      path: 'menu',
      name: 'Menu',
      component: () => import('@/views/system/Menu')
    },
    {
      path: 'manage',
      name: 'Manage',
      component: () => import('@/views/system/Manage')
    }
  ]
}
