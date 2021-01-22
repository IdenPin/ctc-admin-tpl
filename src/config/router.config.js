/**
 * 白名单，不需要登录就可以访问
 */

const whiteListPath = ['/login', '/demo', '/testRoute']

/**
 * 路由模式
 */

const mode = 'hash'

/**
 * IS_DYNAMIC_ROUTES 确定该项目菜单权限系统是静态的还是动态的
 * PERMISSION_TREE 确定后台返回的是菜单树还是角色
 * 动态路由：不但需要登录还要根据后台的角色或者路由树做权限过滤操作
 * 静态路由：只需要验证是否登录，本地所有的路由信息都可以访问（针对不需要获取菜单树接口或者用户角色）
 */

const IS_DYNAMIC_ROUTES = true

const PERMISSION_TREE = true

module.exports = { whiteListPath, mode, IS_DYNAMIC_ROUTES, PERMISSION_TREE }
