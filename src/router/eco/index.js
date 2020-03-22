import SpManager from './sp-manager'
import EcoWebPage from './eco-web-page'
export default {
  path: '/eco',
  name: 'Eco',
  meta: {
    title: '环保生态圈',
    icon: 'international'
  },
  component: () => import('@/components/Layout/index'),
  children: [SpManager, EcoWebPage]
}
