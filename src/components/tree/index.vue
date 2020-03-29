<template>
  <div>
    <ul v-for="row in treeData" :key="row.value">
      <Item :model="row" ></Item>
    </ul>
  </div>
</template>
<script>
import Item from './Item'
export default {
  name: 'Tree',
  data () {
    return {
      treeData: [{
        label: '垃圾焚烧',
        value: 'Ljfs',
        children: [{
          label: '事中调度',
          value: 'Szdd',
          children: [
            {
              label: '工况序列异常',
              value: 'Gkxlyc'
            }, {
              label: '异常数据 ',
              value: 'Ycsj'
            }, {
              label: '短时浓度超标',
              value: 'Dsndcb'
            }, {
              label: '炉温不达标',
              value: 'Lwbdbsz'
            }, {
              label: '数据缺失',
              value: 'Sjqs'
            }
          ]
        }, {
          label: '事后处理',
          value: 'Shcl',
          children: [
            {
              label: '日均值超标',
              value: 'Rjzcb'
            }, {
              label: '炉温不达标',
              value: 'Lwbdbsh'
            }, {
              label: '不正常运行',
              value: 'Bzcyx'
            }, {
              label: '涉嫌虚假标记',
              value: 'Sxxjbj'
            }
          ]
        }]
      }, {
        label: '测试菜单',
        value: 'Cscd',
        children: [{
          label: '测试子集菜单',
          value: 'Cszjcd'
        }]
      }]
    }
  },
  components: {
    Item
  }
}
</script>
