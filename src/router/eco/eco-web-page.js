export default {
  path: 'eco-web-page',
  component: () => import('@/components/RouterNode'),
  children: [
    {
      path: 'eco-page-banner',
      name: 'SpManageList',
      component: () => import('@/views/eco/eco-web-page/EcoPageBanner')
    },
    {
      path: 'eco-hot-news',
      name: 'EcoHotNews',
      component: () => import('@/views/eco/eco-web-page/EcoHotNews')
    }
  ]
}
