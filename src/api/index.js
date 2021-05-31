// 所有的接口请求
const modulesFiles = require.context('.', true, /^.+(?<!index)\.js$/);
const modulus = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.+)\.js$/, '$1');
  const value = modulesFiles(modulePath);
  value.default && (modules[moduleName] = value.default);
  return modules;
}, {});
export default modulus;
