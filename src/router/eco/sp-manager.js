export default {
  path: 'sp-manager',
  component: () => import('@/components/RouterNode'),
  children: [
    {
      path: 'sp-manager-list',
      name: 'SpManageList',
      component: () => import('@/views/eco/sp-manager/SpManageList')
    },
    {
      path: 'sp-menu-role',
      name: 'SpMenuRole',
      component: () => import('@/views/eco/sp-manager/SpMenuRole')
    }
  ]
}
