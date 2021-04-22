import * as ajax from '@/utils/request';
export default {
  addUser: params => ajax.post('/addUser', params, {contentType: 'application/json'}),
  editUser: params => ajax.get('/editUser', params),
  delUser: params => ajax.del('/delUser', params)
};
