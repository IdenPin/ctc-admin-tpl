<template>
  <div>
    用户中心
    <p>{{userData}}</p>
  </div>
</template>
<script>

import UserSev from '@/api/UserSev'
export default {
  name: 'About',
  data () {
    return {
      userData: {}
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    async  getProfile () {
      const { data } = await UserSev.profile()
      this.userData = data
    }
  }
}
</script>
