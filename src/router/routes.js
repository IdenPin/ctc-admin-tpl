import constantRoutes from './constant-routes'
import dynamicRoutes from './dynamic-routes'
import Config from '@/config'

export default Config.router.IS_DYNAMIC_ROUTES ? dynamicRoutes : constantRoutes
