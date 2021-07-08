import axios from 'axios'

export function config(api, data) {
  api = 'http://localhost:4010/widgets/config' + api
  const config = {
    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI5MjYxNjQ2ZjNjOWY0YjVmYTliYzQzMzBmMTljNjdhNiIsInVzZXIiOiJhZG1pbiIsInN1YiI6ImFkbWluIn0.W-D9ylNKfHlF2Dbb7TPyPK0-2HQ57uxJl_aeAAPVMOVL3sTnu085VYpyGKN6j2T8FBVIM_cCps0ib085sJoRNw' }
  }
  return axios.post(api, data, config)
}
export function resources(projectId) {
  const config = {
    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI5MjYxNjQ2ZjNjOWY0YjVmYTliYzQzMzBmMTljNjdhNiIsInVzZXIiOiJhZG1pbiIsInN1YiI6ImFkbWluIn0.W-D9ylNKfHlF2Dbb7TPyPK0-2HQ57uxJl_aeAAPVMOVL3sTnu085VYpyGKN6j2T8FBVIM_cCps0ib085sJoRNw' }
  }
  return axios.get('http://localhost:4010/resource/' + projectId + '/resources', config)
}
export function columns(resourceId) {
  const config = {
    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI5MjYxNjQ2ZjNjOWY0YjVmYTliYzQzMzBmMTljNjdhNiIsInVzZXIiOiJhZG1pbiIsInN1YiI6ImFkbWluIn0.W-D9ylNKfHlF2Dbb7TPyPK0-2HQ57uxJl_aeAAPVMOVL3sTnu085VYpyGKN6j2T8FBVIM_cCps0ib085sJoRNw' }
  }
  return axios.get('http://localhost:4010/widgets/config/columns/' + resourceId, config)
}
export function get(api, params) {
  const config = {
    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI5MjYxNjQ2ZjNjOWY0YjVmYTliYzQzMzBmMTljNjdhNiIsInVzZXIiOiJhZG1pbiIsInN1YiI6ImFkbWluIn0.W-D9ylNKfHlF2Dbb7TPyPK0-2HQ57uxJl_aeAAPVMOVL3sTnu085VYpyGKN6j2T8FBVIM_cCps0ib085sJoRNw' }
  }
  config['params'] = params
  return axios.get(api, config)
}
export function all(params, urls) {
  const requests = []
  for (let i = 0; i < params.length; i++) {
    requests.push(config(urls[i], params[i]))
  }
  axios.all(requests)
    .then(axios.spread(function(acct, perms) {
      // 两个请求现在都执行完成
    }))
}
