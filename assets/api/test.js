import service from '../utils/service'
const testApi = {
  add: (params) => {
    return service.post('/test/add', params)
  },
  delete: (params) => {
    return service.post('/test/delete', params)
  },
  detail: (params) => {
    return service.post('/test/detail', params)
  },
  list: (params) => {
    return service.post('/test/list', params)
  },
  update: (params) => {
    return service.post('/test/update', params)
  },
}
export default testApi;
