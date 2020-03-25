import Axios from 'axios'
import Store from '@/store'
import { Notification, MessageBox } from 'element-ui'

const service = Axios.create({
  baseURL: process.env.BASE_URL
})

// 请求拦截
service.interceptors.request.use(config => {
  const token = Store.getters.token
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
}, error => {
  console.log('error', error)
  return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 0) {
    Notification.error({
      title: '失败',
      message: res.msg || 'Error'
    })
    if (res.code === 400) {
      // to re-login
      MessageBox.confirm(
        'You have been logged out, you can cancel to stay on this page, or log in again',
        'Confirm logout',
        {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).then(() => {
        Store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
}, error => {
  // 断网 或者 请求超时 状态
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      console.log('超时了')
      Notification.error({
        title: '失败',
        message: '请求超时，请检查网络是否连接正常'
      })
    } else {
      // 可以展示断网组件
      Notification.error({
        title: '失败',
        message: '请求失败，请检查网络是否已连接'
      })
    }
    return
  }
  // 省略其它代码 ······
  return Promise.reject(error)
})

export default service
