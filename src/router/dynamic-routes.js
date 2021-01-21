/**
 * dynamic-routes
 * 根据权限树或者角色动态生成的路由
 * dynamicRoutes 计算通过 router.addRoutes 追加
 */
import BlankPage from '@/components/globals/BlankPage'
import Layout from '@/components/layouts/Index.vue'
import RouteNode from '@/components/globals/RouteNode.vue'
import Config from '@/config'

import constantRoutes from './constant-routes'
import _ from 'lodash'

/**
 * 拍平本地路由树
 * @param {*} localConstantRoutes
 * @returns
 */

export function flatLocalMenuFn(localConstantRoutes) {
  let flatMenuObj = {}
  let handlerLoop = (data, prefix) => {
    if (Array.isArray(data)) {
      data.forEach(v => {
        const path = prefix ? `${prefix}${v.path}` : v.path

        flatMenuObj[path] = v

        if (v.children && v.children.length > 0) {
          handlerLoop(v.children, path + '/')
        }
      })
    }
  }
  handlerLoop(localConstantRoutes)
  return flatMenuObj
}

/**
 * 拍平后台返回的树
 * 生成路由所需要的信息
 * {
 *  "/work-manage": {
 *    "path": "/work-manage",
 *    "meta": {
 *      "title": "工作管理",
 *      "icon": "el-icon-tickets"
 *     },
 *    "component": {}
 * }
 * @param {*} apiRoutes
 * @returns
 */

export function flatApiMenuFn(apiRoutes) {
  let localFlatMenuObj = flatLocalMenuFn(constantRoutes)
  let flatMenuObj = {}
  let handlerLoop = (data, prefix) => {
    if (Array.isArray(data)) {
      data.forEach(v => {
        const path = prefix ? `${prefix}${v.accessPath}` : v.accessPath

        let hasChild = v.children && v.children.length > 0

        flatMenuObj[path] = {
          path: v.accessPath,
          meta: {
            title: v.name,
            icon: v.icon || 'el-icon-tickets'
          }
        }

        /**
         * 通过path对比，localFlatMenu中获取component。
         * 如果没有孩子节点且path对应的 component没有， 则先展示默认的 Layout
         * 否则使用用户配置的component
         */

        const userComponent = localFlatMenuObj[path] && localFlatMenuObj[path].component
        flatMenuObj[path].component = hasChild && !userComponent ? Layout : userComponent || BlankPage

        /**
         * 如果 path 中 '/' 只有一个，说明没有children，则需要添加一层 layout
         */

        if (path.lastIndexOf('/') === 0) {
          /**
           * 如果没有孩子节点
           */

          if (!hasChild) {
            let hasNoChillRoute = Object.assign({}, flatMenuObj[path])
            hasNoChillRoute.path = 'index'

            /**
             * 生成一个 layout 布局
             */
            let temp = {
              component: Layout,
              path: path,
              redirect: `${path}/index`,
              children: [hasNoChillRoute]
            }
            const hasConstantRoutes = flatMenuObj[path].component
            if (hasConstantRoutes && hasConstantRoutes.name === 'BlankPage') {
              flatMenuObj[path] = temp
            }
          }
        } else {
          /**
           * 多层级树，除第一级和最后一级以外children component 设置为 RouteNode 空节点
           */

          if (hasChild && !userComponent) {
            flatMenuObj[path]['component'] = RouteNode
          }
        }

        if (hasChild) {
          /**
           * 有孩子节增加 redirect 属性，并重定向到第一个孩子
           */

          flatMenuObj[path]['redirect'] = `${path}/${v.children[0].accessPath}`

          handlerLoop(v.children, path + '/')
        }
      })
    }
  }
  handlerLoop(apiRoutes)
  return flatMenuObj
}

/**
 * 生成前台可以渲染的路由
 * 以后台返回的路由树为基础，通过 flatMenuObj 对象中的 key 查找 apiRoutes 中的 path
 * 如果相等就将 flatMenuObj 对象的 value 赋给apiRoutes 中 path 相等项
 * @param {*} apiRoutes
 * @param {*} routesObj
 * @returns
 */

export function createMenuFn(apiRoutes, flatMenuObj) {
  const cloneApiRoutes = apiRoutes.slice()
  let loopMenu = (data, prefix) => {
    if (Array.isArray(data)) {
      data.forEach(v => {
        const hasChild = v.children && v.children.length > 0
        /**
         * 生成唯一路径，避免 path 重复
         */

        const path = prefix ? `${prefix}${v.accessPath || v.path}` : v.accessPath || v.path
        v.path = path
        for (let key in flatMenuObj) {
          if (v.path === key) {
            const { path, meta, component, redirect } = flatMenuObj[key]

            meta && (v.meta = meta)
            redirect && (v.redirect = redirect)
            v.path = path
            v.alwaysShow = v.alwaysShow || false
            v.component = component

            if (flatMenuObj[key].lastIndexOf !== 0 && !v.children && flatMenuObj[key].children) {
              v.children = flatMenuObj[key].children
              v.alwaysShow = v.alwaysShow || false
            }
          }
        }
        if (hasChild) {
          loopMenu(v.children, path + '/')
        }
      })
    }
  }
  loopMenu(cloneApiRoutes)
  return cloneApiRoutes
}

/**
 * 删除路由无用的字段
 * @returns
 */
export function cleanKey(routes) {
  let loopMenu = data => {
    if (Array.isArray(data)) {
      data.forEach(v => {
        let hasChild = v.children && v.children.length > 0
        delete v.accessPath
        delete v.id
        delete v.icon
        delete v.name
        delete v.open
        if (hasChild) {
          loopMenu(v.children)
        }
      })
    }
  }
  loopMenu(routes)
}

/**
 * ---------------------------
 * ---------角色方案-----------
 * ---------------------------
 */

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function filterRoutesByRoles(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterRoutesByRoles(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 生成最终的权限路由，并且把*放在最后
 * 方案一，后端返回权限树
 * 方案二，后端返回角色数组
 * @returns
 */

export function createDynamicRoutes(data) {
  let routes

  /**
   * 权限树
   */
  if (Config.router.PERMISSION_TREE) {
    // 拍平
    const flatMenuObj = flatApiMenuFn(data)
    // 通过 path 递归查找赋值
    routes = createMenuFn(data, flatMenuObj)

    // 清除无用的值
    cleanKey(_.cloneDeep(routes))

    /**
     * 模糊路由匹配一定要放在最后
     */
    routes.push({
      path: '*',
      redirect: '/404'
    })
  } else {
    /**
     * 角色数组
     */
    if (data.includes('admin')) {
      routes = constantRoutes
    } else {
      routes = filterRoutesByRoles(constantRoutes, data)
    }
  }

  return routes
}
