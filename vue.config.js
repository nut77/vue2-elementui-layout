const path = require('path');
const isProdEnv = process.env.NODE_ENV === 'production';
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // 打包 如果history是hash publicPath需要设置为相对路径 /pro
  publicPath: isProdEnv ? './' : '/',
  lintOnSave: !isProdEnv,
  pages: {
    index: {
      entry: 'src/main/index.js',
      title: process.env.VUE_APP_SYSTEM_NAME
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
      },
      '/download': {
        target: 'https://npm.taobao.org/mirrors/node',
        pathRewrite: {
          '^/download': ''
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
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      ]
    }
  },
  productionSourceMap: false
};
