export default {
  path: '/log',
  name: 'Log',
  component: () => import('@/components/Layout/index'),
  redirect: '/',
  children: [
    {
      path: 'admin',
      name: 'Admin',
      component: () => import('@/views/log/Admin')
    },
    {
      path: 'web',
      name: 'Web',
      component: () => import('@/views/log/Web')
    }
  ]
}
