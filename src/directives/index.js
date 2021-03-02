import Vue from 'vue'
import dialogDrag from './dialogDrag'
import vLoading from './loading/index'
import vMask from './mask/index'

import Waves from './waves/index'
import './waves/index.css'

vMask()
Vue.directive('vLoading', vLoading)
Vue.directive('Waves', Waves)
dialogDrag(Vue)
