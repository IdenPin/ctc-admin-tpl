/**
 * dynamic-routes file <核心>
 * 根据权限树或者角色动态生成的路由
 * dynamicRoutes 计算通过 router.addRoutes 追加
 */
import Config from '@/config'
// import OtherRoute from './modules/other-routes'

const dynamicRoutes = [
  {
    path: '*',
    redirect: '/404'
  }
]

// 初始化赋值
export default [...Config.router.defaultRoutes, ...dynamicRoutes]
