import fetch from '@/utils/fetch'


export function getConcentratorDetail(routeId) {
  return fetch({
    url: 'api/manage/getConcentratorDetail',
    method: 'get',
    params:{routeId}
  })
}

export function deleteConcentrator(concentratorId) {
  return fetch({
    url: 'api/manage/deleteConcentrator',
    method: 'get',
    params:{concentratorId}
  })
}

export function getCircuitDetail(concentratorId) {
  return fetch({
    url: 'api/manage/getCircuitDetail',
    method: 'get',
    params:{concentratorId}
  })
}

export function getGroupDetail(circuitId) {
  return fetch({
    url: 'api/manage/getGroupDetail',
    method: 'get',
    params:{circuitId}
  })
}

export function getControllerDetail(groupId) {
  return fetch({
    url: 'api/manage/getControllerDetail',
    method: 'get',
    params:{groupId}
  })
}
