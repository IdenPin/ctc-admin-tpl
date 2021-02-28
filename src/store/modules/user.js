import router from '@/router'

export default {
  namespaced: true,
  state: {
    username: '',
    token: '',
    userInfo: ''
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
        })
        commit('SET_USERNAME', data.username)
        commit('SET_TOKEN', data.token)
        commit('SET_USER_INFO', data)
        return { code, data }
      } catch (error) {
        return error
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
        resolve()
      })
    }
  },
  getters: {
    username: state => state.username,
    token: state => state.token,
    userInfo: state => state.userInfo
  }
}
