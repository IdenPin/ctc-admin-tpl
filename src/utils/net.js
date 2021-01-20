import axios from 'axios'
import store from '@/store'
import net from '@/config/net.config'
import { Notification } from 'element-ui'

/**
 * 取消请求
 * @type {CancelTokenSource}
 * @example
 *
 * import {source} from '@/utils/axios'
 * source.cancel('描述文字....')
 */
export const source = axios.CancelToken.source()

function createInstance(opt) {
  return axios.create(
    Object.assign(
      {},
      {
        ...net.opt,
        cancelToken: source.token
      },
      opt
    )
  )
}

/**
 * 创建axios实例
 * @private
 * @return {*}
 */

const service = createInstance({
  baseURL: process.env.VUE_APP_BASE_API
})

// 请求拦截
service.interceptors.request.use(
  config => {
    const token = store.getters['user/token']
    token && (config.headers.Authorization = `Bearer ${token}`)
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
