export default {
  path: 'eco-web-page',
  name: 'EcoWebPage',
  component: () => import('@/components/RouterNode'),
  meta: { title: 'Web页面', icon: '0', noCache: true },
  children: [
    {
      path: 'eco-page-banner',
      name: 'EcoWebPageBanner',
      component: () => import('@/views/eco/eco-web-page/EcoPageBanner'),
      meta: { title: '首页配置', icon: '0', noCache: true }
    },
    {
      path: 'eco-hot-news',
      name: 'EcoWebPageNews',
      component: () => import('@/views/eco/eco-web-page/EcoHotNews'),
      meta: { title: '热点聚焦', icon: '0', noCache: true }

    }
  ]
}
