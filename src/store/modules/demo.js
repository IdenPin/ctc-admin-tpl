// // 后台接口返回的菜单树（接口返回没有component字段）：
var apiMenuData = [{ path: '/system', name: 'System', redirect: '/system/user', meta: { title: '系统管理', icon: 'password' }, children: [{ path: 'user', name: 'User', meta: { title: '用户管理', icon: 'ball', noCache: true } }, { path: 'role', name: 'Role', meta: { title: '角色管理', icon: 'ball', noCache: true } }] }, { path: '/eco', name: 'Eco', meta: { title: '环保生态圈', icon: 'international' }, redirect: '/eco/sp-manager', children: [{ path: 'sp-manager', name: 'Sp-manager', meta: { title: '服务商管理', icon: '0', noCache: true }, children: [{ path: 'sp-manager-list', name: 'Sp-manager-list', meta: { title: '服务商列表', icon: '0', noCache: true } }, { path: 'sp-menu-role', name: 'Sp-menu-role', meta: { title: '权限配置', icon: '0', noCache: true } }] }, { path: 'eco-web-page', name: 'Eco-web-page', meta: { title: 'Web页面', icon: '0', noCache: true }, children: [{ path: 'eco-page-banner', name: 'Eco-page-banner', meta: { title: '首页配置', icon: '0', noCache: true } }, { path: 'eco-hot-news', name: 'Eco-hot-news', meta: { title: '热点聚焦', icon: '0', noCache: true } }] }] }]

// 本地菜单树
var localMenuData = [
  {
    path: '/eco',
    name: 'Eco',
    redirect: '/',
    component: 1,
    children: [
      {
        path: 'sp-manager',
        component: 2,
        children: [
          { path: 'sp-manager-list', name: 'SpManageList', component: 3 },
          { path: 'sp-menu-role', name: 'SpMenuRole', component: 4 }
        ]
      },
      {
        path: 'eco-web-page',
        component: 5,
        children: [
          { path: 'eco-page-banner', name: 'SpManageList', component: 6 },
          { path: 'eco-hot-news', name: 'EcoHotNews', component: 7 }
        ]
      }
    ]
  },
  {
    path: '/log',
    name: 'Log',
    redirect: '/',
    component: 8,
    children: [
      { path: 'admin', name: 'Admin', component: 9 },
      { path: 'web', name: 'Web', component: 10 }
    ]
  },
  {
    path: '/system',
    name: 'System',
    redirect: '/system/user',
    component: 11,
    children: [
      { path: 'user', name: 'User', component: 12 },
      { path: 'role', name: 'Role', component: 13 },
      { path: 'menu', name: 'Menu', component: 14 },
      { path: 'manage', name: 'Manage', component: 15 }
    ]
  },
  { path: '/about', name: 'About', component: 16 },
  { path: '/404', component: 15 },
  { path: '*', redirect: '/404', hidden: true }
]

// function localDataFn (data, path) {
//   return data.filter(v => {
//     if (v.path === path) {
//       return v
//     }
//     if (v.children) {
//       localDataFn(v.children, path)
//     }
//   })
// }
// // 实现权限过滤
// // 要求将 localMenuData 中的 component 字段放入到  apiMenuData 相对应的位置

// function apiDataFn (data) {
//   data.forEach(v => {
//     const result = localDataFn(localMenuData, v.path)
//     if (v.path === result[0].path) {
//       v.component = result[0].component
//     }
//     if (v.children) {
//       apiDataFn(v.children)
//     }
//   })
// }
// apiDataFn(localMenuData)
// console.log('apiMenuData', apiMenuData)

// 1.拍平localMenuData
var local = {}
function formatLocal (data) {
  data.forEach(item => {
    local[item.path] = item.component
    if (item.children) {
      formatLocal(item.children)
    }
  })
}

// 2. 循环查找复制
function merge (data, local) {
  data.forEach(item => {
    var component = local[item.path]
    if (component) {
      item.component = component
    }
    if (item.children) {
      merge(item.children, local)
    }
  })
}

formatLocal(localMenuData)
merge(apiMenuData, local)

console.log('apiMenuData', apiMenuData)
