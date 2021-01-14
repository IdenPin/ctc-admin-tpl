import axios from 'axios'
import { Notification } from 'element-ui'
import Store from '@/store'

const service = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000 * 20
})
service.defaults.withCredentials = true

// 请求拦截
service.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${Store.state.user.token}`
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else {
      // TODO
      Notification.error({
        title: '错误',
        message: res.msg || '未知异常'
      })
    }
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      Notification.error({
        title: '失败',
        message: '对不起，请求超时了'
      })
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default service
