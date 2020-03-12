import UserSev from '@/api/UserSev'
import router, { CONST_ROUTER, ASYNC_LOCAL_ROUTER, resetRouter } from '@/router'
/**
 * 路由权限过滤
 * 通过接口返回的树形菜单 path 和本地路由的 path 比较
 * 如果 path 相等则给 localData 添加 component 属性
 * @param {接口返回的路由树} data
 * @param {本地携带 component 的路由} localData
 */

const localDataFn = (target, data) => {
  let foo
  data.filter((v, i) => {
    if (v.path === target) {
      foo = i
    }
    if (v.children) {
      localDataFn(target, v.children)
    }
  })
  return foo
}
const filterPermissionRoutes = (data, localData) => {
  data.forEach((v, i) => {
    // 第一层菜单
    v.deepLevel = 1
    // console.log('path->1：' + v.path)
    console.log('0------0', localDataFn(v, data))
    if (v.path === localData[i].path) {
      v.component = localData[i].component
    }
    // if (v.path === '/about') {
    //   console.log('v：' + localData[i].path)
    // }
    if (v.children) {
      v.children.forEach((vv, ii) => {
        // 第二层菜单
        vv.deepLevel = 2
        // console.log('path-->2：' + v.path + '/' + vv.path)
        const biz = localData[i].children
        if (vv.path === biz[ii].path) {
          vv.component = biz[ii].component
        }
        if (vv.children) {
          vv.children.forEach((vvv, iii) => {
            // 第三层菜单
            vvv.deepLevel = 3
            const foo = biz[ii].children[iii]
            if (vvv.path === foo.path) {
              vvv.component = foo.component
            }
            // console.log('path--->3：' + v.path + '/' + vv.path + '/' + vvv.path)
          })
        }
      })
    }
  })
  return data
}
const user = {
  state: {
    token: '',
    username: '',
    menu: []
  },
  mutations: {
    SET_TOKEN (state, data) {
      state.token = data
    },
    SET_USERNAME (state, data) {
      state.username = data
    },
    SET_MENU (state, data) {
      state.menu = CONST_ROUTER.concat(data)
    }
  },
  actions: {
    async doLogin ({ commit }, params) {
      const { data } = await UserSev.login(params)
      commit('SET_USERNAME', data.username)
      commit('SET_TOKEN', data.token)
      return true
    },
    doLogout ({ commit }) {
      commit('SET_USERNAME', '')
      commit('SET_TOKEN', '')
      resetRouter()
    },
    async fetchMenu ({ commit }) {
      const { data } = await UserSev.menu()
      const asyncRouter = filterPermissionRoutes(data, ASYNC_LOCAL_ROUTER)
      // console.log('---', asyncRouter)
      commit('SET_MENU', asyncRouter)
      router.addRoutes(asyncRouter)
      return true
    }
  }
}

export default user
