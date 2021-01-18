import BlankPage from '@/components/globals/BlankPage'
import Layout from '@/components/layouts/Index.vue'
import RouteNode from '@/components/globals/RouteNode.vue'

export const menuData = {
  msg: '查询成功',
  data: [
    {
      accessPath: '/work-manage',
      children: [
        {
          accessPath: 'ljfs',
          name: '垃圾焚烧',
          icon: 'tree-icon',
          id: '4028846f753ea32601753eb87ff80001',
          children: [
            {
              accessPath: 'aaaaa',
              children: [
                {
                  accessPath: 'abc',
                  name: '垃圾焚烧abc',
                  icon: 'xxxx',
                  id: '4028846f71a4b5710171a4e871890007'
                },
                {
                  accessPath: 'xyz',
                  name: '垃圾焚烧xyz',
                  icon: 'xxxx',
                  id: '4028846f71a4b5710171a4e871890007'
                }
              ],
              name: '统计报表',
              icon: 'menu-icon5',
              id: '4028846f71a4b5710171a4e6349c0005'
            }
          ]
        },
        {
          accessPath: 'fire',
          name: '火电行业',
          icon: 'tree-icon',
          id: '4028846f75a247190175a27f27660000'
        },
        {
          accessPath: 'concrete',
          name: '水泥行业',
          icon: 'tree-icon',
          id: '4028846f75a247190175a285e63e0001'
        },
        {
          accessPath: 'paper',
          name: '造纸行业',
          icon: 'tree-icon',
          id: '4028846f75a247190175a28658290002'
        },
        {
          accessPath: 'other',
          name: '其他行业',
          icon: 'tree-icon',
          id: '4028846f75a247190175a286ca920003'
        }
      ],
      name: '工作管理',
      icon: 'menu-icon1',
      id: '4028846f71106f54017110f4c9970002',
      open: true
    },
    /**
     * 外链demo
     */
    {
      accessPath: 'http://www.qq.com',
      name: '腾讯外链',
      icon: 'el-icon-brush'
    },
    /**
     * iframe 内链demo
     */
    {
      accessPath: 'https://idenpin.github.io/element-table/docs/#/',
      name: '报表内链',
      icon: 'el-icon-document-copy',
      iframe: true
    },
    {
      accessPath: '/deal-upload',
      name: '处罚信息上报',
      icon: 'menu-icon2',
      id: '4028846f71106f54017110f7f6340009'
    },
    {
      accessPath: '/statistic-analyze',
      name: '统计分析',
      icon: 'menu-icon3',
      id: '4028853076ac7ac10176adbaeb8900dc'
    },
    {
      accessPath: '/account-report',
      alwaysShow: true,
      children: [
        {
          accessPath: 'tjbb',
          name: '垃圾焚烧',
          icon: 'xxxx',
          id: '4028846f71a4b5710171a4e871890007'
        }
      ],
      name: '统计报表',
      icon: 'menu-icon5',
      id: '4028846f71a4b5710171a4e6349c0005'
    },
    {
      accessPath: '/user-manage',
      name: '用户管理',
      icon: 'menu-icon6',
      id: '4028846f71106f54017110fbbab30010'
    },
    {
      accessPath: '/company-search',
      name: '企业用户查询',
      icon: 'menu-icon7',
      id: '4028846f71106f54017110fd69140011'
    },
    {
      accessPath: '/system-manage',
      name: ' 系统管理',
      icon: 'menu-icon8',
      id: '4028846f71106f54017110ff4e220012'
    },
    {
      accessPath: '/work-notice',
      name: '工作通知',
      icon: 'menu-icon9',
      id: '4028846f7114708b0171149ae32e0004'
    },
    {
      accessPath: '/user-info',
      name: '我的信息',
      icon: 'menu-icon10',
      id: '4028846f7114708b017114a06c3b000b',
      children: [
        {
          accessPath: 'wdxx',
          name: '垃圾焚烧abc',
          icon: 'xxxx',
          id: '4028846f71a4b5710171a4e871890007',
          alwaysShow: true,
          children: [
            {
              accessPath: 'wdxxBurn',
              name: '垃圾焚烧',
              icon: 'xxxx',
              id: '4028846f71a4b5710171a4e871890007'
            }
          ]
        },
        {
          accessPath: 'xyz',
          name: '垃圾焚烧xyz',
          icon: 'xxxx',
          id: '4028846f71a4b5710171a4e871890007'
        }
      ]
    }
  ],
  status: 200
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

function flatMenuFn(apiRoutes) {
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
            icon: 'el-icon-tickets'
          }
        }

        /**
         * 如果没有对应的 components， 则先展示默认的 BlankPage 或者 Layout
         */

        flatMenuObj[path].component = hasChild ? Layout : BlankPage

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
            flatMenuObj[path] = temp
          }
        } else {
          /**
           * 多层级树，除第一级和最后一级以外children component 设置为 RouteNode 空节点
           */

          if (hasChild) {
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

function createMenuFn(apiRoutes, flatMenuObj) {
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
            delete v.accessPath
            delete v.id
            delete v.icon
            delete v.name
            delete v.open
            meta && (v.meta = meta)
            redirect && (v.redirect = redirect)
            v.path = path
            v.alwaysShow = v.alwaysShow || false

            v.component = component

            /**
             * 不是一级树，没有孩子
             */
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

export const flatMenuObj = flatMenuFn(menuData.data)
export const resultRoutes = createMenuFn(menuData.data, flatMenuObj)
