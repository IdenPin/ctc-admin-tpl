/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultRoutes from './default-routes'
import Store from '@/store'
Vue.use(VueRouter)

// fix: Navigation cancelled from "/system-manage/index" to "/assign-document/index" with a new navigation
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// fix

const router = new VueRouter({
  mode: 'hash',
  routes: [...defaultRoutes]
})

// router.beforeEach((to, from, next) => {
//   const token = Store.getters['user/token']
//   if (token) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//     } else {
//       next()
//     }
//   } else {
//     if (to.path === '/login') {
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`)
//     }
//   }
// })

export default router
