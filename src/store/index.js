import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 设备
    device: 'desktop',
    // 侧边栏状态
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    isOpenAside: true
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      state.isOpenAside = false
      state.sidebar.withoutAnimation = withoutAnimation
    }
  },
  actions: {
    toggleSidebar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    toggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    }
  },
  getters: {
    sidebar: state => state.sidebar.opened,
    device: state => state.device
  },
  modules: {}
})
