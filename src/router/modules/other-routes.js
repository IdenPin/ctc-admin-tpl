import BlankPage from '@/components/globals/BlankPage'
import Layout from '@/components/layouts/Index.vue'

export default [
  // 督办单撤销管理
  {
    path: '/db-revocation',
    component: Layout,
    name: 'DbRevocation',
    redirect: '/db-revocation/index',
    children: [
      {
        path: 'index',
        name: 'DbRevocationIndex',
        component: BlankPage,
        meta: {
          title: '督办单撤销管理',
          icon: 'menu-icon12'
        }
      }
    ]
  },
  {
    path: '/assign-document',
    component: Layout,
    redirect: '/assign-document/index',
    children: [
      {
        path: 'index',
        name: 'assignDocumentIndex',
        component: BlankPage,
        meta: {
          title: '交办单',
          icon: 'menu-icon13'
        }
      }
    ]
  }
]
