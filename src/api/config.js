import request from '../utils/request'

export function basic(projectId, data) {
  return request({
    url: `/widgets/config/basic/${projectId}`,
    method: 'post',
    data
  })
}

export function carousel(projectId, data) {
  return request({
    url: `/widgets/config/carouselItem/${projectId}`,
    method: 'post',
    data
  })
}

export function leadBoard(projectId, data) {
  return request({
    url: `/widgets/config/leadBoard/${projectId}`,
    method: 'post',
    data
  })
}

export function category(projectId, data) {
  return request({
    url: `/widgets/config/category/${projectId}`,
    method: 'post',
    data
  })
}

export function panelGroup(projectId) {
  return request({
    url: `/widgets/config/panelGroup/${projectId}`,
    method: 'post'
  })
}

export function articleList(projectId) {
  return request({
    url: `/widgets/config/articleList/${projectId}`,
    method: 'post'
  })
}

export function visualization(projectId, data) {
  return request({
    url: `/widgets/config/visualization/${projectId}`,
    method: 'post',
    data
  })
}

export function columns(resourceId) {
  return request({
    url: `/widgets/config/columns/${resourceId}`,
    method: 'get'
  })
}
export function resources(projectId) {
  return request({
    url: `/widgets/config/${projectId}/resources/`,
    method: 'get'
  })
}

export function projects() {
  return request({
    url: `/Project/all`,
    method: 'get'
  })
}

export function searchConfig(projectId, data) {
    return request({
      url: `/SearchConfig/project/${projectId}`,
      method: 'post',
      data
    })
  }

  export function searchFieldConfig(projectId, data) {
    return request({
      url: `/SearchConfig/fields/project/${projectId}`,
      method: 'post',
      data
    })
  }

export function searchResultStatisticsConfig(projectId, data) {
  return request({
    url: `/SearchConfig/result/statistic/project/${projectId}`,
    method: 'post',
    data
  })
}

export function addProject(data) {
  return request({
    url: `/Project`,
    method: 'post',
    data
  })
}

export function addNav(projectId,data) {
  return request({
    url: `/navWidgets/config/visualization/project/${projectId}`,
    method: 'post',
    data
  })
}
