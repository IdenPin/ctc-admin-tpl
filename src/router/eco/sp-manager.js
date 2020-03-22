export default {
  path: 'sp-manager',
  name: 'EcoSpManager',
  component: () => import('@/components/RouterNode'),
  meta: { title: '服务商管理', icon: '0', noCache: true },
  children: [
    {
      path: 'sp-manager-list',
      name: 'EcoSpManagerList',
      meta: { title: '服务商列表', icon: '0', noCache: true },
      component: () => import('@/views/eco/sp-manager/SpManageList')
    },
    {
      path: 'sp-menu-role',
      name: 'EcoSpManagerRole',
      component: () => import('@/views/eco/sp-manager/SpMenuRole'),
      meta: { title: '权限配置', icon: '0', noCache: true }

    }
  ]
}
