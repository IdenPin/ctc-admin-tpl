const plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins.unshift([
    'transform-remove-console',
    {
      exclude: ['error', 'warn']
    }
  ])
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
}
