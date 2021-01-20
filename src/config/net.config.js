/**
 * axios 实例配置
 */

const opt = {
  /**
   * 请求头
   */
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  /**
   * 超时时间（不做限制）
   */
  timeout: 0,
  /**
   * 携带验证
   */
  withCredentials: true,
  /**
   * 响应数据类型
   */
  responseType: 'json',
  /**
   * 请求内容长度
   */
  maxContentLength: -1
}

export default opt
