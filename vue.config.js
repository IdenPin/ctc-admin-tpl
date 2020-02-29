const path = require('path')
module.exports = {
  // variables全局引入
  // 1. vue add style-resources-loader 2. 配置vue.config.js
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/assets/style/_variables.scss')]
    }
  },

  // chainWebpack
  chainWebpack (config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // alias 设置
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('@@', path.resolve('src/assets'))
    // 打包文件带 hash
    config.output.filename('[name].[hash].js').end()

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

    // 删除换行而加的配置
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
  }
}
