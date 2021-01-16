import Config from '@/config'

// 1 拍平本地路由
export function flatRoutesFn(routes) {
  let targetObj = {}
  function flatRef(data, routes, basePath = '/') {
    routes.reduce((acc, v) => {
      const path = `${basePath}/${v.path}`
      const prefix = path.lastIndexOf('//') + 1
      acc[path.substr(prefix, path.length)] = v
      if (v.children) {
        flatRef(data, v.children, path)
      }
      return acc
    }, data)
  }
  flatRef(targetObj, routes)
  return targetObj
}

// 2 处理接口返回的数据、生成 fullPath
export function addAsyncFullPathFn(routes) {
  let newRoutes = [...routes]
  function addFullPath(data, basePath = '/') {
    data.length > 0 &&
      data.forEach(v => {
        const path = `${basePath}/${v.accessPath}`
        const prefix = path.lastIndexOf('//') + 1
        v['fullPath'] = path.substr(prefix, path.length)
        if (v.children) {
          addFullPath(v.children, path)
        }
      })
  }
  addFullPath(routes)
  return newRoutes
}

// 3 合并生成路由信息
export function mergeRoutesFn(data, localFlatRoutes) {
  let newRoutes = []
  function createAsyncRoutes(data, subData) {
    newRoutes = data.reduce((acc, v) => {
      const itemLocal = localFlatRoutes[v['fullPath']]
      if (subData) {
        acc.forEach((item, index) => {
          if ((item && item.path) === subData.accessPath) {
            acc[index]['children'] = acc[index]['children'] || []
            acc[index]['children'].push({
              path: v.accessPath,
              component: itemLocal.component,
              meta: {
                title: v.name,
                icon: v.icon
              }
            })
          }
        })
      } else {
        acc.push({
          path: v.accessPath,
          component: itemLocal.component,
          meta: {
            title: v.name,
            icon: v.icon
          }
        })
      }
      if (v.children) {
        // children 递归处理
        createAsyncRoutes(v.children, v)
      }
      return acc
    }, newRoutes)
  }
  createAsyncRoutes(data)
  return newRoutes
}

/**
 * 设置网站标题
 */

export function setDocumentTitle(pageTitle) {
  if (pageTitle) {
    document.title = `${pageTitle} - ${Config.project.name}`
    return
  }
  document.title = `${Config.project.name}`
}
