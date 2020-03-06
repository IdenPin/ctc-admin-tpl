import service from '@@/utils/request'

export default class UserSev {
  static login (params) {
    return service({
      method: 'post',
      url: '/login',
      data: params
    })
  }

  static menu () {
    return service({
      method: 'get',
      url: '/menu'
    })
  }

  static profile () {
    return service({
      method: 'get',
      url: '/profile'
    })
  }
}
