import Axios from 'axios'
import Store from '@/store'
import { Notification, MessageBox } from 'element-ui'

const service = Axios.create({
  baseURL: 'http://localhost:3000/api'
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
  Notification.error({
    title: '失败',
    message: error.message
  })
  return Promise.reject(error)
})

export default service
