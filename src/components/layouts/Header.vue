<template>
  <div class="ctc-layout-header-container">
    <router-link to="/index" tag="div" class="logo-box">
      <i class="icon-logo"></i>
      <div class="title">长天长后台管理系统通用框架 {{ softVersion }}</div>
    </router-link>
    <div class="top-nav">
      <!-- <div class="item mr-10">我的待办</div> -->
      <!-- <router-link to="/" class="item mr-10" tag="div">未读通知 </router-link> -->
    </div>

    <el-dropdown szie="small" v-if="isNeedLogin">
      <el-link :underline="false"
        ><i class="el-icon-s-custom mr-5"></i>{{ username }}<i class="el-icon-arrow-down el-icon--right"
      /></el-link>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退 出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import variables from '@/assets/styles/_variables.scss'
import { isNeedLogin } from '@/config/router.config'
const { version } = require('../../../package.json')
export default {
  name: 'Header',
  data() {
    return {
      isNeedLogin,
      softVersion: `v${version}`
    }
  },
  computed: {
    ...mapGetters({
      username: 'user/username'
    }),
    variables() {
      return variables
    }
  },
  methods: {
    ...mapActions({
      doLogout: 'user/doLogout'
    }),
    logout() {
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const code = await this.doLogout()
        code === 200 && this.$router.push('/login')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';
@import '@/assets/styles/global.scss';
.ctc-layout-header-container {
  display: flex;
  align-items: center;
  .logo-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    .icon-logo {
      line-height: $headerHeight;
      display: block;
      margin-right: 8px;
      height: 30px;
      width: 30px;
      background-image: url('~@/assets/images/logo.png');
      background-size: cover;
    }

    .title {
      font-size: 16px;
      color: #fff;
      font-weight: normal;
      line-height: $headerHeight;
    }
  }
  .top-nav {
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
    flex: 1;
    .item {
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;
      color: #acb0b9;
      text-decoration: none;
      font-size: 12px;
      transition: all 0.3s ease;
      &:hover {
        color: #fff;
      }
      .sub-title-total {
        margin-top: 2px;
        margin-left: 5px;
        font-size: 16px;
        color: #ec6367;
      }
      &:not(:last-of-type)::after {
        content: '|';
        color: #acb0b9;
        display: inline-block;
        margin-left: 10px;
      }

      span {
        margin-left: 22px;
      }
    }
  }
}

.el-link.el-link--default {
  color: #e8e8e8;
}
</style>
