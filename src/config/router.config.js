/**
 * 白名单，不需要登录就可以访问
 */

const whiteListPath = ['/login', '/demo']

/**
 * 无登录权限跳转界面地址
 */
const noTokenRedirectPath = '/login'

/**
 * 路由模式
 */

const mode = 'history'

/**
 * IS_DYNAMIC_ROUTES 确定该项目菜单权限系统是静态的还是动态的
 * PERMISSION_TREE 确定后台返回的是菜单树还是角色
 * NO_PERMISSION 不需要登录
 * 动态路由：不但需要登录还要根据后台的角色或者路由树做权限过滤操作
 * 静态路由：只需要验证是否登录，本地所有的路由信息都可以访问（针对不需要获取菜单树接口或者用户角色）
 *
 * 模式一：后台返回登录用户路由菜单树
 *       IS_DYNAMIC_ROUTES：true
 *       PERMISSION_TREE: true
 *       NO_PERMISSION：false
 *
 * 模式二：后台返回登录用户的角色
 *        IS_DYNAMIC_ROUTES：true
 *        PERMISSION_TREE: false
 *        NO_PERMISSION：false
 *
 * 模式三：本地路由，需要登录
 *        IS_DYNAMIC_ROUTES：false
 *        NO_PERMISSION：false
 *
 * 模式四：本地路由，无需登录
 *        IS_DYNAMIC_ROUTES: false
 *        NO_PERMISSION：true
 */

const IS_DYNAMIC_ROUTES = true

const PERMISSION_TREE = true

const NO_PERMISSION = false

module.exports = { whiteListPath, mode, IS_DYNAMIC_ROUTES, PERMISSION_TREE, noTokenRedirectPath, NO_PERMISSION }
