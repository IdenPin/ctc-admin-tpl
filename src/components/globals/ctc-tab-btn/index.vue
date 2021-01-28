<template>
  <div class="ctc-tab-btn">
    <div v-for="(item, index) in list" :key="index">
      <div :class="['flex', 'cursor-p', index === value ? 'active' : '']" @click="$emit('change', index)">
        <span>{{ item }}</span>
        <ctc-divider direction="v" v-if="index !== list.length - 1" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CtcTabBtn',
  model: {
    props: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Number, String]
    },
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.ctc-tab-btn {
  display: inline-flex;
  border: 1px solid #e9ecf1;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 13px;
  color: #909399;
}

.active {
  color: $mainColor;
}
</style>
