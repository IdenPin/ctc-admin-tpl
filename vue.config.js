const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  publicPath: '/',
  configureWebpack: () => ({
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': path.resolve('src'),
        '@@': path.resolve('src/assets')
      }
    }
  }),

  // variables全局引入
  // 1. vue add style-resources-loader 2. 配置vue.config.js
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/style/_variables.scss'),
        path.resolve(__dirname, 'src/assets/style/global.scss')
      ]
    }
  },

  // chainWebpack
  chainWebpack (config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
    // if (process.env.NODE_ENV === 'production') {
    //   // #region 启用GZip压缩
    //   config
    //     .plugin('compression')
    //     .use(CompressionPlugin, {
    //       asset: '[path].gz[query]',
    //       algorithm: 'gzip',
    //       test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
    //       threshold: 10240,
    //       minRatio: 0.8,
    //       cache: true
    //     })
    //     .tap(args => { })
    // }

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
