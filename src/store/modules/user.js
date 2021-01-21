import router from '@/router'
import baseRoutes from '@/router/base-routes'
import Config from '@/config'
import { createDynamicRoutes } from '@/router/dynamic-routes'
import menuData from '@/mock/menu'

export default {
  namespaced: true,
  state: {
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

    async doLogin({ commit, dispatch }, formData) {
      try {
        const { data, code } = await new Promise(resolve => {
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
          }, 1000)
        })
        commit('SET_USERNAME', data.username)
        commit('SET_TOKEN', data.token)
        commit('SET_USER_INFO', data)

        /**
         * 如果 IS_DYNAMIC_ROUTES 为 true
         * 则登录成功后需要请求后端接口获取角色或者路由树
         */

        const { IS_DYNAMIC_ROUTES, PERMISSION_TREE } = Config.router
        if (IS_DYNAMIC_ROUTES) {
          return PERMISSION_TREE ? await dispatch('createRoutesByTree') : await dispatch('createRoutesByRoles')
        } else {
          if (this.state.user.menu.length === 0) {
            commit('SET_MENU', router.options.routes)
          }
          return { code }
        }
      } catch (error) {
        return error
      }
    },

    /**
     * 方案一，后端返回权限菜单树生成路由
     */
    async createRoutesByTree({ commit, dispatch }) {
      try {
        // 获取菜单树接口
        return await new Promise(resolve => {
          commit('SET_MENU', null)
          setTimeout(() => {
            const routes = createDynamicRoutes(menuData.data)
            routes.unshift(...baseRoutes)
            commit('SET_MENU', routes)
            router.addRoutes(routes)
            resolve({
              code: 200
            })
          }, 500)
        })
      } catch (error) {
        await dispatch('resetToken')
      }
    },

    /**
     * 方案二，后端返回用户角色生成路由
     */
    async createRoutesByRoles({ commit }) {
      // 获取角色信息
      const { roles } = await new Promise(resolve => {
        commit('SET_MENU', null)
        setTimeout(() => {
          resolve({
            roles: ['user']
            // roles: ['admin']
          })
        }, 500)
      })

      const routes = createDynamicRoutes(roles)
      commit('SET_MENU', routes)
      router.addRoutes(routes)
      return {
        code: 200
      }
    },

    /**
     * 登出
     */
    async doLogout({ dispatch }) {
      try {
        const { code } = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              code: 200
            })
          }, 100)
        })
        if (code == 200) {
          await dispatch('resetToken')
        }
        return code
      } catch (error) {
        return error
      }
    },

    /**
     * 清空用户信息
     * @param {*} param0
     * @returns
     */
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERNAME', null)
        commit('SET_TOKEN', null)
        commit('SET_USER_INFO', {})
        commit('SET_MENU', null)
        resolve()
      })
    }
  },
  getters: {
    username: state => state.username,
    token: state => state.token,
    userInfo: state => state.userInfo,
    menu: state => state.menu,
    menuInit: state => state.menuInit
  }
}
