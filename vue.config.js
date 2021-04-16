const path = require('path');

module.exports = {
  // 打包 如果history是hash publicPath需要设置为相对路径
  publicPath: process.env.NODE_ENV === 'production' ? '/pro' : './',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/variable.less')]
    }
  }
};
