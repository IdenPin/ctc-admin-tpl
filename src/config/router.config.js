/**
 * 白名单，不需要登录就可以访问
 */

const whiteListPath = ['/login', '/demo', '/testRoute']

/**
 * 路由模式
 */

const mode = 'hash'

/**
 * 是否需要登录
 */

const isNeedLogin = true

/**
 * 是否开启navView 导航
 */
const isNeedNavView = true

module.exports = { whiteListPath, mode, isNeedLogin, isNeedNavView }
