const getters = {
  // app
  sidebar: state => state.app.sidebar.opened,
  device: state => state.app.device,

  // user
  username: state => state.user.username,
  token: state => state.user.token,
  menu: state => state.user.menu
}
export default getters
