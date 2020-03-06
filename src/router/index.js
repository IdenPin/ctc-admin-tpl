import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const CONST_ROUTER = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/components/Layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home
      }
    ]
  }
]
const ASYNC_ROUTER = [
  {
    path: '/about',
    name: 'About',
    component: () => import('@/components/Layout/index.vue'),
    children: [
      {
        path: '/about',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  }
]
const routes = [...CONST_ROUTER, ...ASYNC_ROUTER]

const router = new VueRouter({
  routes
})

export default router
