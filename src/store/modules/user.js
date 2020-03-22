import UserSev from '@/api/UserSev'
import router, { CONST_ROUTER, ASYNC_LOCAL_ROUTER, resetRouter } from '@/router'
import _ from 'lodash'

// 方便服务端接口数据返回，如果只用一级不用返回 layout 路由
function addIndexRouter (data) {
  // 一级添加 index 路由
  data.forEach((item, index) => {
    const oldItem = _.cloneDeep(item)
    if (!item.children) {
      data[index] = {
        path: oldItem.path,
        name: oldItem.name,
        children: [{
          path: 'index',
          name: item.name.slice(0, 1).toUpperCase() + item.name.slice(1) + 'Index'
        }]
      }
    }
  })
}
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
    clapLocalMenu[item.name] = {
      component: item.component,
      name: item.name,
      meta: item.meta
    }
    if (item.children) {
      clapLocalMenuFn(item.children)
    }
  })
}

// 2. 循环查找复制
const filterPermissionRoutes = (data, clapLocalMenu) => {
  data.forEach(item => {
    // console.log('item', item)
    var component = clapLocalMenu[item.name].component
    var meta = clapLocalMenu[item.name].meta
    if (component) {
      item.component = component
      item.meta = meta
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
      addIndexRouter(data)
      clapLocalMenuFn(ASYNC_LOCAL_ROUTER)
      filterPermissionRoutes(data, clapLocalMenu)
      data.push({ path: '*', redirect: '/error', hidden: true })
      console.log('--clapLocalMenu---', clapLocalMenu)
      commit('SET_MENU', data)
      router.addRoutes(data)
      return true
    }
  }
}

export default user
