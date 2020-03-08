import UserSev from '@/api/UserSev'
const user = {
  state: {
    token: '',
    username: '',
    menu: ''
  },
  mutations: {
    SET_TOKEN (state, data) {
      state.token = data
    },
    SET_USERNAME (state, data) {
      state.username = data
    },
    SET_MENU (state, data) {
      state.menu = data
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
    },
    async fetchMenu ({ commit }) {
      const { data } = await UserSev.menu()
      commit('SET_MENU', data)
      return true
    }
  }
}

export default user
