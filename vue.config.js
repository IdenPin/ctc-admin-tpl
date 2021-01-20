const path = require('path')
const ProjectConfig = require('./src/config/project.config')
const RouterConfig = require('./src/config/router.config')

const chalk = require('chalk')

/**
 * 结构默认配置
 */
const { name, publicPath, outputDir, assetsDir, devServer } = ProjectConfig
const { mode, IS_DYNAMIC_ROUTES } = RouterConfig

console.log(chalk.green(`> 欢迎使用${name} 进行开发 \n`))
console.log(chalk.green(`当前路由模式是 ${mode}, ${IS_DYNAMIC_ROUTES ? '已' : '未'}开启动态菜单权限\n`))

module.exports = {
  publicPath,
  outputDir,
  assetsDir,
  devServer,
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@images': path.resolve(__dirname, 'src/assets/images'),
        '@styles': path.resolve(__dirname, 'src/assets/styles')
      }
    }
  },

  pluginOptions: {
    // vue add style-resources-loader
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/styles/_variables.scss'),
        path.resolve(__dirname, './src/assets/styles/global.scss')
      ]
    }
  },

  chainWebpack(config) {
    // 配置字体图标 npm i svg-sprite-loader -S
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/assets/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
