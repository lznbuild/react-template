import axios from 'axios'
import { message } from 'antd'
import authUtils from './authUtils';

const toggleLoading = (isView) => {
  if (document.querySelector('#loading-component')) {
    document.querySelector('#loading-component').style.display = isView ? 'block' : 'none';
  }
}

// 创建axios实例
const service = axios.create({
  timeout: 10000, // 请求超时时间
  baseURL: '/api', //请求前缀，根据实际情况修改
})

// request拦截器
service.interceptors.request.use(
  config => {
    toggleLoading(true);
    let tokenId = authUtils.getTokenId();
    if (typeof tokenId == 'undefined') {
      tokenId = ''
    }
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': tokenId,
    }
    // console.info('axios拦截', config)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    toggleLoading(false);
    if (response.data.isError) {
      if (response.data.error.codeNumber === 904) {
        message.info(response.data.error.message, 2, () => {
          authUtils.logout();
        })
      } else {
        message.info(response.data.error.message)
      }
    } else {
      return response
    }
  },
  error => {
    toggleLoading(false);
    console.log('err', error)// for debug
    message.error(error.message, 3)
    return Promise.reject(error)
  })

export default service
