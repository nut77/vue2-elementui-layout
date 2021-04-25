// element ui 自定义表单验证规则
import tool from '@/utils/tool';
import * as ajax from '@/utils/request';

const Validator = {};

function codeAddValidator(value, callback, type, tip) {
  if (!value) {
    callback(new Error(tip + '不能为空'));
  } else if (!tool[`is${tool.upperFirstLetter(type)}`](value)) {
    callback(new Error(tip + '格式有误'));
  } else {
    const res = ajax.get('test');
    res.data ? callback(new Error(tip + '已存在')) : callback();
  }
}

// 验证是否为空
Validator.required = (rule, value, callback) => {
  if (!value) {
    callback(new Error('不能为空'));
  } else {
    callback();
  }
};

// 验证ip
Validator.ip = (rule, value, callback) => {
  if (!value) {
    callback(new Error('IP不能为空'));
  } else if (!tool.isIp(value)) {
    callback(new Error('IP格式有误'));
  } else {
    callback();
  }
};
Validator.ipUnique = (rule, value, callback) => {
  codeAddValidator(value, callback, 'ip', 'IP');
};

// 验证域名
Validator.domain = (rule, value, callback) => {
  if (!value) {
    callback(new Error('域名不能为空'));
  } else if (!tool.isDomain(value)) {
    callback(new Error('域名格式有误'));
  } else {
    callback();
  }
};
Validator.domainUnique = (rule, value, callback) => {
  codeAddValidator(value, callback, 'domain', '域名');
};

// 验证HASH
Validator.hash = (rule, value, callback) => {
  if (!value) {
    callback(new Error('HASH不能为空'));
  } else if (!tool.isHash(value)) {
    callback(new Error('HASH格式有误'));
  } else {
    callback();
  }
};
Validator.hashUnique = (rule, value, callback) => {
  codeAddValidator(value, callback, 'hash', 'HASH');
};

// 验证端口
Validator.port = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback(new Error('端口不能为空'));
  } else if (!Number.isInteger(value)) {
    callback(new Error('请输入整数值'));
  } else if (value < 1 || value > 65535) {
    callback(new Error('端口范围有误'));
  } else {
    callback();
  }
};

// 验证手机号
Validator.phoneUnique = (rule, value, callback) => {
  codeAddValidator(value, callback, 'phone', '手机号');
};

// 验证压缩包文件格式是否正确
Validator.file = (rule, value, callback) => {
  let file;
  const dialogElements = document.querySelectorAll('.el-dialog__wrapper');

  for (const ele of dialogElements) {
    if (ele.style.display !== 'none') {
      file = ele.querySelector('.el-dialog-file');
      break;
    }
  }
  if (!value) {
    callback(new Error('请上传文件'));
  } else if (!/\.(zip)$/.test(value)) {
    callback(new Error('文件格式有误'));
  } else if (file && file.files[0].size > 500 * 1024 * 1024) {
    callback(new Error('请上传500M以内的文件'));
  } else {
    callback();
  }
};

// 验证邮箱账号
Validator.emailUnique = (rule, value, callback) => {
  codeAddValidator(value, callback, 'email', '邮箱');
};
Validator.isEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('邮箱不能为空'));
  } else if (!tool.isEmail(value)) {
    callback(new Error('邮箱格式有误'));
  } else {
    callback();
  }
};
Validator.isEmailArr = (rule, value, callback) => {
  if (!value) {
    callback();
    return false;
  }
  const arr = value.split(',');
  for (const item of arr) {
    if (!tool.isEmail(item)) {
      callback(new Error('邮箱格式有误'));
      return false;
    }
  }
  callback();
};

export default Validator;
