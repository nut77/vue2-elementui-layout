const path = require('path');

module.exports = {
  // 打包 如果history是hash publicPath需要设置为相对路径
  publicPath: process.env.NODE_ENV === 'production' ? '/pro' : './',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/variable.less')]
    }
  }
};
