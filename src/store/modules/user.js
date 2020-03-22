import UserSev from '@/api/UserSev'
import router, { CONST_ROUTER, ASYNC_LOCAL_ROUTER, resetRouter } from '@/router'
/**
 * 路由权限过滤
 * 1. 将本地 ASYNC_LOCAL_ROUTER 拍平存入新对象
 * 2. 循环查找复制
 * @param {接口返回的路由树} data
 * @param {本地携带 component 的路由} ASYNC_LOCAL_ROUTER
 */
// 1. 将本地 ASYNC_LOCAL_ROUTER 拍平存入新对象
const clapLocalMenu = {}
function clapLocalMenuFn (data) {
  data.forEach(item => {
    clapLocalMenu[item.path] = item.component
    if (item.children) {
      clapLocalMenuFn(item.children)
    }
  })
}

// 2. 循环查找复制
const filterPermissionRoutes = (data, clapLocalMenu) => {
  data.forEach(item => {
    var component = clapLocalMenu[item.path]
    if (component) {
      item.component = component
    }
    if (item.children) {
      filterPermissionRoutes(item.children, clapLocalMenu)
    }
  })
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
      clapLocalMenuFn(ASYNC_LOCAL_ROUTER)
      filterPermissionRoutes(data, clapLocalMenu)
      console.log('data---', data)
      commit('SET_MENU', data)
      router.addRoutes(data)
      return true
    }
  }
}

export default user
