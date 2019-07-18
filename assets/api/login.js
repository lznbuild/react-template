import service from '../utils/service'
const loginApi = {
  //登录
  login: (params) => {
    return service.post('/login', params)
  },

  logout:()=>{
    return service.get('/logout')
  },

  //功能权限管理
  getModuleRoles: (params) => {
    return service.post('/getModuleRoles', params)
  }

}
export default loginApi;
