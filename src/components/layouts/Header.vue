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
    <div class="sys-setting" @click="toggleDrawerState"><i class="el-icon-setting"></i> 系统设置</div>
    <div class="user-dropdown">
      <div class="user-info">
        <i class="el-icon-user"></i>
        <el-dropdown class="dropdown-menu">
          <span class="text-ellipsis username el-dropdown-link"
            >{{ $store.state.user.username }}<i class="el-icon-arrow-down ml-3"></i
          ></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="() => $router.push('/user-info')">
              查看
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import variables from '@/assets/styles/_variables.scss'
const { version } = require('../../../package.json')
export default {
  components: {},
  name: 'Header',
  data() {
    return {
      softVersion: `v${version}`
    }
  },
  computed: {
    variables() {
      return variables
    }
  },
  methods: {
    ...mapActions({
      toggleDrawerState: 'app/toggleDrawerState',
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
  .sys-setting {
    cursor: pointer;
    color: #acb0b9;
    margin-right: 20px;
    font-size: 13px;
    .el-icon-user {
      font-size: 16px;
    }
  }
  .user-dropdown {
    cursor: pointer;
    .user-info {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      transition: all 0.3s ease;
      &:hover {
        i,
        span {
          color: #fff;
        }
      }

      .dropdown-menu {
        display: flex;
      }

      .el-icon-user {
        font-size: 16px;
        margin-right: 5px;
      }

      i,
      .username {
        color: #acb0b9;
      }

      .el-icon-arrow-down {
        position: relative;
        top: 0px;
      }

      .username {
        max-width: 200px;
      }
    }
  }
}
</style>
