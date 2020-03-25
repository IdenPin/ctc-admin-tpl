import Mock from 'mockjs'
import { login } from './login'

Mock.setup({
  // 配置Ajax请求延时
  timeout: 1500
})

Mock.mock(/\/login/, login)
export default Mock
