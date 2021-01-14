import Vue from 'vue'
import SvgIcon from '@/components/globals/SvgIcon'
// register globally
Vue.component('svg-icon', SvgIcon)

// @/assets/icons/svg
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
