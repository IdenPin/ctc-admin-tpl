// 网站 name
const name = '重点排污单位自动监控与基础数据库系统'

// 开发以及部署时的URL
const publicPath = ''

// 生产环境构建文件的目录名
const outputDir = 'dist'

// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
const assetsDir = 'static'

/**
 * 开发服务器设置
 */

const mockServer = () => {
  if (process.env.NODE_ENV === 'development') {
    return require('@/mock')
  } else {
    return ''
  }
}

const devServer = {
  hot: true,
  port: '3000',
  open: true,
  noInfo: false,
  overlay: {
    warnings: true,
    errors: true
  }
  // after: mockServer()
}

/**
 * NProgress 配置
 */

const nProgress = {
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false
}

/**
 * 业务相关
 */
const pager = () => ({
  total: 100,
  currentPage: 1,
  pageSize: 10
})

module.exports = {
  name,
  publicPath,
  outputDir,
  devServer,
  assetsDir,
  nProgress,
  pager
}
