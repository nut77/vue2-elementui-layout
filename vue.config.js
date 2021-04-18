const path = require('path');
const isProductionEnv = process.env.NODE_ENV === 'production';

module.exports = {
  // 打包 如果history是hash publicPath需要设置为相对路径
  publicPath: isProductionEnv ? '/pro' : './',
  lintOnSave: !isProductionEnv,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'system name',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/variable.less')]
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8090/api',
        ws: true,
        // 允许websocket跨域
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
