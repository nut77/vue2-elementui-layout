export default {
  'post|/login': option => {
    return {
      status: 200,
      message: 'success',
      data: {
        token: 122333,
        role: 'admin'
      }
    };
  }
};
