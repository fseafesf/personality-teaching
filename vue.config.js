const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://129.204.196.92:8880',
        // target: 'http://teach.komorebi-nxj.cn/api',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}
