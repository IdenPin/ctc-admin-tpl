import SpManager from './sp-manager'
import EcoWebPage from './eco-web-page'
export default {
  path: '/eco',
  name: 'Eco',
  redirect: '/',
  component: () => import('@/components/Layout/index'),
  children: [SpManager, EcoWebPage]
}
