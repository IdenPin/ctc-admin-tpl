import { login, userMenu, logout } from '@/api/auth'
import { flatRoutesFn, addAsyncFullPathFn, mergeRoutesFn } from '@/utils/tools'
import asyncRoutes from '@/router/async-routes'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    // 设置面板关闭
    username: '',
    token: '',
    userInfo: '',
    menu: []
  },
  mutations: {
    SET_USERNAME: (state, value) => {
      state.username = value
    },
    SET_TOKEN: (state, value) => {
      state.token = value
    },
    SET_USER_INFO: (state, value) => {
      state.userInfo = value
    },
    SET_MENU: (state, value) => {
      if (value === null) {
        state.menu = []
      } else {
        state.menu = state.menu.concat(...value)
      }
    }
  },
  actions: {
    /**
     * 登录
     * @param {表单提交的数据} formData
     * @returns
     */

    async doLogin({ commit }, formData) {
      try {
        const { data, code } = await new Promise((resolve, reject) => {
          console.log('formData', formData)
          setTimeout(() => {
            resolve({
              data: {
                username: formData.username,
                token: 'xxx1232xxx-1212',
                data: {
                  age: 20
                }
              },
              code: 200
            })
          }, 3000)
        })
        commit('SET_USERNAME', data.username)
        commit('SET_TOKEN', data.token)
        commit('SET_USER_INFO', data)
        return { code }
      } catch (error) {
        return error
      }
    },

    /**
     * 获取角色或者菜单树
     */
    async fetchMenu({ commit }) {
      try {
        const menuData = await userMenu()
        const apiData = menuData.data

        // 1 拍平本地路由
        const localFlatRoutes = flatRoutesFn(asyncRoutes)

        // 2 处理接口返回的数据、生成 fullPath
        const fullPathApiData = addAsyncFullPathFn(apiData)

        // 3 合并生成路由信息
        const resultRoutes = mergeRoutesFn(fullPathApiData, localFlatRoutes)

        // 4 处理没有children的路由、增加 index
        resultRoutes.forEach(v => {
          if (!v.children) {
            v['children'] = v['children'] || [{}]
            v.children[0] = {
              path: 'index',
              component: localFlatRoutes[`${v.path}/index`].component,
              meta: {
                icon: v.meta.icon || localFlatRoutes[`${v.path}/index`].icon,
                title: v.meta.title
              }
            }
          }
        })

        resultRoutes.push({
          path: '*',
          redirect: '/404',
          hidden: true
        })
        commit('SET_MENU', resultRoutes)
        router.addRoutes(resultRoutes)
        router.options.routes.push(...resultRoutes)
        return menuData
      } catch (error) {
        return error
      }
    },

    /**
     * 登出
     */
    async doLogout({ commit }) {
      try {
        const { code } = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              code: 200
            })
          }, 2000)
        })
        if (code == 200) {
          commit('SET_USERNAME', null)
          commit('SET_TOKEN', null)
          commit('SET_USER_INFO', {})
          commit('SET_MENU', null)
        }
        return code
      } catch (error) {
        return error
      }
    }
  },
  getters: {
    username: state => state.username,
    token: state => state.token,
    userInfo: state => state.userInfo,
    menu: state => state.menu
  }
}
