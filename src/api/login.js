import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: 'login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(username) {
  return fetch({
    url: '/api/user/info',
    method: 'get',
    params:{username}
  })
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}
