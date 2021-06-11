import * as ajax from '@/utils/request';
export default {
  addUser: params => ajax.post('/user/create', params),
  editUser: params => ajax.put('/user/update', params),
  delUser: params => ajax.del(`/user/delete/${params}`),
  getUser: params => ajax.post('/user/queryPage', params),
  checkUser: params => ajax.get(`/user/queryByUsername/${params}`),
  getSystemLog: params => ajax.post('/systemLog/queryPage', params),
  getSystemLogDetail: params => ajax.get(`/systemLog/detail?id=${params}`),
  downloadSystemLog: params => ajax.get('/systemLog/download', params)
};
