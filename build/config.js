require('dotenv').config({
  path: 'env.conf'
});

const proxyMap = {
  feproxy: ''
};
const cookies = '';
// 改动配置立即生效
module.exports = {
  /* mock|server */
  type: process.env.mockType || 'mock',
  // 代理配置
  serverConfig: {
      target: process.env.feproxy || proxyMap.feproxy,
      changeOrigin: true,
      headers: {
          'Cookie': process.env.cookies || cookies
      }
  },
};
