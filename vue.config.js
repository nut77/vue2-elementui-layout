const path = require('path');
const isProdEnv = process.env.NODE_ENV === 'production';

module.exports = {
  // 打包 如果history是hash publicPath需要设置为相对路径
  publicPath: isProdEnv ? '/pro' : '/',
  lintOnSave: !isProdEnv,
  pages: {
    index: {
      entry: 'src/main/index.js',
      title: process.env.VUE_APP_SYSTEM_NAME,
      // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  pluginOptions: {
    // 设置全局less文件，使组件内也可以引用全局less变量
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/styles/variable.less')]
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
        target: 'http://api.ifbes.com/mock/20/api',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    // 别名配置
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@a': path.resolve(__dirname, './src/assets'),
        '@p': path.resolve(__dirname, './src/pages'),
        '@c': path.resolve(__dirname, './src/components'),
        '@l': path.resolve(__dirname, './src/layout')
      }
    }
  },
  // css相关配置
  /*css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    requireModuleExtension: false // 启用 CSS modules for all styles / pre-processor files.
  },*/
  productionSourceMap: false
};
