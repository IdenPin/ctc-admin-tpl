export default {
  namespaced: true,
  state: {
    // 设置侧边栏菜单状态
    isCollapse: false,

    // 设置面板关闭
    isDrawerState: false,

    // 导航模式 顶部导航：true, 侧边栏导航：false
    isTopMenu: false,
    // 固定顶部
    isFixedLayoutHeader: true,
    // 固定侧边栏
    isFixedLayoutSidebar: true,
    // 固定内容区域
    isFixedLayoutPage: true
  },
  mutations: {
    TOGGLE_COLLAPSE: state => {
      state.isCollapse = !state.isCollapse
    },

    TOGGLE_DRAWER_STATE: state => {
      state.isDrawerState = !state.isDrawerState
    },
    TOGGLE_TOP_MENU: (state, value) => {
      state.isTopMenu = value
    },
    TOGGLE_FIXED_LAYOUT_HEADER: (state, value) => {
      state.isFixedLayoutHeader = value
    },
    TOGGLE_FIXED_LAYOUT_SIDEBAR: (state, value) => {
      state.isFixedLayoutSidebar = value
    },
    TOGGLE_FIXED_LAYOUT_PAGE: (state, value) => {
      state.isFixedLayoutPage = value
    }
  },
  actions: {
    toggleDrawerState({ commit }) {
      commit('TOGGLE_DRAWER_STATE')
    },
    toggleTopMenu({ commit }, value) {
      commit('TOGGLE_TOP_MENU', value)
    },
    toggleLayoutHeader({ commit }, value) {
      commit('TOGGLE_FIXED_LAYOUT_HEADER', value)
    },
    toggleLayoutSidebar({ commit }, value) {
      commit('TOGGLE_FIXED_LAYOUT_SIDEBAR', value)
    },
    toggleLayoutPage({ commit }, value) {
      commit('TOGGLE_FIXED_LAYOUT_PAGE', value)
    }
  },
  getters: {
    isCollapse: state => state.isCollapse,

    isDrawerState: state => state.isDrawerState,
    isTopMenu: state => state.isTopMenu,
    isFixedLayoutHeader: state => state.isFixedLayoutHeader,
    isFixedLayoutSidebar: state => state.isFixedLayoutSidebar,
    isFixedLayoutPage: state => state.isFixedLayoutPage
  }
}
