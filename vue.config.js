const path = require('path')
const ProjectConfig = require('./src/config/project.config')

/**
 * 结构默认配置
 */
const { name, publicPath, outputDir, assetsDir, devServer } = ProjectConfig

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
