import UserSev from '@/api/UserSev'
import router, { CONST_ROUTER, ASYNC_ROUTER, resetRouter } from '@/router'
const filterPermissionRoutes = (data, localData) => {
  data.forEach((v, i) => {
    // 第一层菜单
    v.deepLevel = 1
    // console.log('path->1：' + v.path)
    if (v.path === localData[i].path) {
      v.component = localData[i].component
    }
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
      console.log(CONST_ROUTER.concat(data))
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
      // 1. 接口获取菜单树
      // 2. 通过对比父级和子集的 path 字段动态加载本地的 component
      const asyncRouter = filterPermissionRoutes(data, ASYNC_ROUTER)
      // console.log('---', asyncRouter)
      commit('SET_MENU', asyncRouter)
      router.addRoutes(asyncRouter)
      return true
    }
  }
}

export default user
