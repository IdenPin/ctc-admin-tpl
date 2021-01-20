/**
 * 白名单，不需要登录就可以访问
 */

const whiteListPath = ['/login', '/testRoute']

/**
 * 路由模式
 */

const mode = 'hash'

/**
 * IS_DYNAMIC_ROUTES 是否启用动态路由
 * 动态路由：指的不但需要登录还要根据后台的角色或者路由树做权限过滤操作
 * 静态路由：只需要验证是否登录，本地所有的路由信息都可以访问（针对不需要获取菜单接口或者用户角色）
 */

const IS_DYNAMIC_ROUTES = true

module.exports = { whiteListPath, mode, IS_DYNAMIC_ROUTES }
