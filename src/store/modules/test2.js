// var data = [{ path: '/system', name: 'System', redirect: '/system/user', meta: { title: '系统管理', icon: 'password' }, children: [{ path: 'user', name: 'User', meta: { title: '用户管理', icon: 'ball', noCache: true }, deepLevel: 2 }, { path: 'role', name: 'Role', meta: { title: '角色管理', icon: 'ball', noCache: true }, deepLevel: 2 }, { path: 'menu', name: 'Menu', meta: { title: '菜单管理', icon: 'ball', noCache: true }, deepLevel: 2 }, { path: 'manage', name: 'Manage', meta: { title: '组织管理', icon: 'ball', noCache: true }, deepLevel: 2 }], deepLevel: 1 }, { path: '/eco', name: 'Eco', meta: { title: '环保生态圈', icon: 'international' }, redirect: '/eco/sp-manager', children: [{ path: 'sp-manager', name: 'Sp-manager', meta: { title: '服务商管理', icon: '0', noCache: true }, children: [{ path: 'sp-manager-list', name: 'Sp-manager-list', meta: { title: '服务商列表', icon: '0', noCache: true }, deepLevel: 3 }, { path: 'sp-menu-role', name: 'Sp-menu-role', meta: { title: '权限配置', icon: '0', noCache: true }, deepLevel: 3 }], deepLevel: 2 }, { path: 'eco-web-page', name: 'Eco-web-page', meta: { title: 'Web页面', icon: '0', noCache: true }, children: [{ path: 'eco-page-banner', name: 'Eco-page-banner', meta: { title: '首页配置', icon: '0', noCache: true }, deepLevel: 3 }, { path: 'eco-hot-news', name: 'Eco-hot-news', meta: { title: '热点聚焦', icon: '0', noCache: true }, deepLevel: 3 }], deepLevel: 2 }], deepLevel: 1 }, { path: '/log', name: 'Log', meta: { title: '日志管理', icon: 'education' }, children: [{ path: 'admin', name: 'Admin', meta: { title: '后端服务', icon: 'ball', noCache: true }, deepLevel: 2 }, { path: 'web', name: 'Web', meta: { title: '前端服务', icon: 'ball', noCache: true }, deepLevel: 2 }], deepLevel: 1 }, { path: '/about', name: 'About', meta: { icon: 'people', title: '个人设置' }, deepLevel: 1 }]

// const filterPermissionRoutes = (data) => {
//   data.forEach(v => {
//     if (v.deepLevel === 1) {
//       console.log('path1：' + v.path)
//     } else if (v.deepLevel === 2) {
//       console.log('path2：' + v.path)
//     } else {
//       console.log('path3：' + v.path)
//     }
//     if (v.children) {
//       filterPermissionRoutes(v.children)
//     }
//   })
// }

// filterPermissionRoutes(data)
// // console.log('====', data)
