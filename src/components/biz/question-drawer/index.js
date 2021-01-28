import Vue from 'vue'
import PrototypeDrawer from './index.vue'
const PrototypeDrawerConstructor = Vue.extend(PrototypeDrawer)

export default function prototypeDrawer(options) {
  const instance = new PrototypeDrawerConstructor({
    data: {
      title: options.title || '说明',
      visible: options.visible,
      content: options.content && options.content.name
    },
    components: {
      [options.content && options.content.name]: options.content
    }
  })
  instance.$mount() // dom 元素渲染完成
  document.body.appendChild(instance.$el)
  return instance
}
