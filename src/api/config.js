import request from '../utils/request'

export function basic(projectId, data) {
  return request({
    url: `/basic/${projectId}`,
    method: 'post',
    data
  })
}

export function carousel(projectId, data) {
  return request({
    url: `/carouselItem/${projectId}`,
    method: 'post',
    data
  })
}

export function leadBoard(projectId, data) {
  return request({
    url: `/leadBoard/${projectId}`,
    method: 'post',
    data
  })
}

export function category(projectId, data) {
  return request({
    url: `/category/${projectId}`,
    method: 'post',
    data
  })
}

export function panelGroup(projectId, data) {
  return request({
    url: `/panelGroup/${projectId}`,
    method: 'post',
    data
  })
}

export function articleList(projectId, data) {
  return request({
    url: `/articleList/${projectId}`,
    method: 'post',
    data
  })
}

export function visualization(projectId, data) {
  return request({
    url: `/visualization/${projectId}`,
    method: 'post',
    data
  })
}

export function columns(resourceId) {
  return request({
    url: `/columns/${resourceId}`,
    method: 'get'
  })
}
export function resources(projectId) {
  return request({
    url: `/${projectId}/resources/`,
    method: 'get'
  })
}

export function projects() {
  return request({
    url: `/project/all`,
    method: 'get'
  })
}

