import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isOpenAside: true
  },
  mutations: {
    changeAsideStatue (state) {
      state.isOpenAside = !state.isOpenAside
    }
  },
  actions: {},
  modules: {}
})
