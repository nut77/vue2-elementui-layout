// mixins分发组件中可以复用的功能，extends扩展另一个组件（便于扩展单文件组件）
const modulesFiles = require.context('.', true, /^.+(?<!index)\.js$/);
const modulus = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.+)\.js$/, '$1');
  const value = modulesFiles(modulePath);
  value.default && (modules[moduleName] = value.default);
  return modules;
}, {});
export default modulus;
