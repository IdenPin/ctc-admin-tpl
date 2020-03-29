<template>
  <li>
    <div @click="toggle">
      {{model.label}}
      <span v-if="isFolder">[{{open ? '- / 收起' : '+ / 展开'}}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <item v-for="model in model.children" :model="model" :key="model.value"></item>
    </ul>
  </li>
</template>
<script>
export default {
  name: 'Item',
  data () {
    return {
      open: false
    }
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    isFolder () {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle () {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  }
}
</script>
