import Mock from 'mockjs';

Mock.mock('/login', 'get', options => {
  return {
    status: 200,
    message: 'success',
    data: {
      token: 122333,
      role: 'admin'
    }
  };
});
