module.exports = {
  publicPath: './',
  transpileDependencies: [
    'vuetify',
  ],
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '็นไบๆ้'
      return args
    })
    
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://121.5.191.249:17913',
        changeOrigin: true,
      },
    }
  }
}
