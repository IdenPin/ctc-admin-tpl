import Layout from '@/components/layouts/Index.vue'
import RouteNode from '@/components/globals/RouteNode.vue'

export default {
  path: '/test',
  name: 'Test',
  component: Layout,
  meta: {
    title: '路由嵌套',
    icon: 'el-icon-folder-opened'
  },
  children: [
    {
      path: 'test1',
      name: 'Test1',
      component: RouteNode,
      meta: {
        title: '一级路由1'
      },
      children: [
        {
          path: 'test1-1-1',
          name: 'Test1-1-1',
          component: RouteNode,
          meta: {
            title: '二级路由1'
          },
          children: [
            {
              path: '1-1-1',
              name: 'index',
              component: () => import('@/views/test/test1/test1-1-1/test1-1-1.vue'),
              meta: {
                title: '三级路由1'
              }
            },
            {
              path: '1-1-2',
              name: 'index',
              component: () => import('@/views/test/test1/test1-1-1/test1-1-2.vue'),
              meta: {
                title: '三级路由2'
              }
            },
            {
              path: '1-1-3',
              name: 'index',
              component: () => import('@/views/test/test1/test1-1-1/test1-1-3.vue'),
              meta: {
                title: '三级路由3'
              }
            }
          ]
        },
        {
          path: 'test1-1',
          name: 'Test1-1',
          component: () => import('@/views/test/test1/Test1-1.vue'),
          meta: {
            title: '二级路由2'
          }
        },
        {
          path: 'test1-2',
          name: 'Test1-2',
          component: () => import('@/views/test/test1/Test1-2.vue'),
          meta: {
            title: '二级路由3'
          }
        }
      ]
    },

    {
      path: 'test2',
      name: 'Test2',
      component: () => import('@/views/test/Test2.vue'),
      meta: {
        title: '一级路由2'
      }
    },
    {
      path: 'test3',
      name: 'Test3',
      component: () => import('@/views/test/Test3.vue'),
      meta: {
        title: '一级路由3'
      }
    }
  ]
}
