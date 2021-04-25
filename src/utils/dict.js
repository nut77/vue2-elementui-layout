// 相关键键值对字典
import * as ajax from '@/utils/request.js';

const Dict = {};

Dict.threatLevColor = [
  'rgba(246, 90, 75, 0.2)', 'rgba(246, 90, 75, 0.3)', 'rgba(246, 90, 75, 0.4)',
  'rgba(246, 90, 75, 0.5)', 'rgba(246, 90, 75, 0.6)', 'rgba(246, 90, 75, 0.8)', 'rgba(246, 90, 75, 1)'];

Dict.level = [
  {label: '灰名单', value: 1},
  {label: '白名单', value: 2},
  {label: '黑名单', value: 3}
];

// 威胁等级 （样本、邮件）
Dict.threatLevel = [
  {label: '正常', value: 0},
  {label: '低危', value: 1},
  {label: '中危', value: 2},
  {label: '高危', value: 3},
  {label: '危急', value: 4}
];

Dict.state = [
  {label: '正在检测', value: 0},
  {label: '检测完成', value: 1},
  {label: '检测异常', value: 2}
];

Dict.updateCountry = async function() {
  try {
    const res = await ajax.get('test');
    Dict.country = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export default Dict;
