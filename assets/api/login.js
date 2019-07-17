import service from '../utils/service'
const loginApi = {
  //功能权限管理
  getModuleRoles: (params) => {
    return service.post('/getModuleRoles', params)
  }
}
export default loginApi;
