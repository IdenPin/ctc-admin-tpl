import request from '@/utils/request'
// import qs from 'qs'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
// export function login(data) {
//   return request({
//     url: 'auth/account/login',
//     method: 'post',
//     data: qs.stringify(data)
//   })
// }

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
