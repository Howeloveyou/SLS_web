import fetch from '@/utils/fetch'

export function getStrategyGroupList(currentPage) {
  return fetch({
    url: 'api/strategy/getStrategyGroupList',
    method: 'get',
    params:{currentPage}
  })
}

export function getGroupList() {
  return fetch({
    url: 'api/strategy/getGroupList',
    method: 'get',
  })
}

export function getStrategyDetailByCycle(groupId,cycle) {
  return fetch({
    url: 'api/strategy/getStrategyDetailByCycle',
    method: 'get',
    params:{groupId,cycle}
  })
}

export function getStrategyDetail(groupId) {
  return fetch({
    url: 'api/strategy/getStrategyDetail',
    method: 'get',
    params:{groupId}
  })
}

export function changeGroupName(groupId,groupName) {
  return fetch({
    url: 'api/strategy/changeGroupName',
    method: 'get',
    params:{groupId,groupName}
  })
}

export function deleteGroup(groupId) {
  return fetch({
    url: 'api/strategy/deleteGroup',
    method: 'get',
    params:{groupId}
  })
}

export function addGroup(groupName) {
  return fetch({
    url: 'api/strategy/addGroup',
    method: 'get',
    params:{groupName}
  })
}

export function deleteStrategy(strategyId) {
  return fetch({
    url: 'api/strategy/deleteStrategy',
    method: 'get',
    params:{strategyId}
  })
}

export function defaultStrategyCommit(params) {
  return fetch({
    url: 'api/strategy/defaultStrategyCommit',
    method: 'post',
    data:{
      groupid:params.chooseGroupId,
      cycle:params.chooseCycle,
      onabsolutetime:params.onAbsoluteTime,
      startmonth:params.startMonth,
      endmonth:params.endMonth,
      onabsolute:params.onAbsolute,
      onTimeStr:params.onTime,
      offabsolutetime:params.offAbsoluteTime,
      offabsolute:params.offAbsolute,
      offTimeStr:params.offTime,
      lumalevel:params.lightness,
    }
  })
}

export function weekendStrategyCommit(params) {
  return fetch({
    url: 'api/strategy/weekendStrategyCommit',
    method: 'post',
    data:{
      groupid:params.chooseGroupId,
      cycle:params.chooseCycle,
      weekend:params.weekendList.toString(),
      onabsolutetime:params.onAbsoluteTime,
      onabsolute:params.onAbsolute,
      onTimeStr:params.onTime,
      offabsolutetime:params.offAbsoluteTime,
      offabsolute:params.offAbsolute,
      offTimeStr:params.offTime,
      lumalevel:params.lightness,
    }
  })
}
