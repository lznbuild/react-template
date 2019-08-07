import service from '../utils/service';
const baseURL = '/api';
const testApi = {
  addOrUpdate: (isAddHandle, params) => {
    let apiUrl = isAddHandle ? '/test/add' : '/test/update';
    return service.post(apiUrl, params);
  },
  delete: (params) => {
    return service.post('/test/delete', params)
  },
  detail: (params) => {
    return service.post('/test/detail', params)
  },
  list: (params) => {
    return service.post('/test/list', params, { baseURL })
  },

}
export default testApi;
