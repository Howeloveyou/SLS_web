import fetch from '@/utils/fetch'

export function getProjectList(projectId) {
  return fetch({
    url: 'api/project/getProjectList',
    method: 'get',
    params:{projectId}
  })
}

export function getRouteList(projectId) {
  return fetch({
    url: 'api/project/getRouteList',
    method: 'get',
    params:{projectId}
  })
}


export function  getConcentratorList(routeId) {
  return fetch({
    url: 'api/project/getConcentratorList',
    method: 'get',
    params:{routeId}
  })
}

export function  getCircuitList(concentratorIds) {
  return fetch({
    url: 'api/project/getCircuitList',
    method: 'get',
    params:{concentratorIds}
  })
}

export function  getGroupList(circuitIds) {
  return fetch({
    url: 'api/project/getGroupList',
    method: 'get',
    params:{circuitIds}
  })
}

export function  getControllerList(groupIds) {
  return fetch({
    url: 'api/project/getControllerList',
    method: 'get',
    params:{groupIds}
  })
}

export function  turnOnLamp(chooseControllerIds,doneTime,lumaLevel,userId) {
  return fetch({
    url: 'api/project/turnOnLamp',
    method: 'get',
    params:{chooseControllerIds,doneTime,lumaLevel,userId}
  })
}

export function  turnOffLamp(chooseControllerIds,doneTime,userId) {
  return fetch({
    url: 'api/project/turnOffLamp',
    method: 'get',
    params:{chooseControllerIds,doneTime,userId}
  })
}

export function  turnOnCircuit(chooseCircuitIds,doneTime,userId) {
  return fetch({
    url: 'api/project/turnOnCircuit',
    method: 'get',
    params:{chooseCircuitIds,doneTime,userId}
  })
}

export function  turnOffCircuit(chooseCircuitIds,doneTime,userId) {
  return fetch({
    url: 'api/project/turnOffCircuit',
    method: 'get',
    params:{chooseCircuitIds,doneTime,userId}
  })
}
