import service from '@/utils/request'

export function login(data) {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return service({
    url: '/logout',
    method: 'post'
  })
}

export function userMenu() {
  return service({
    url: '/menu',
    method: 'get'
  })
}
