<template>
  <div class="ctc-login">
    <div class="ctc-header">
      <i class="icon-logo"></i>
      <div class="title">长天长后台管理系统通用框架 {{ softVersion }}</div>
    </div>
    <div class="ctc-main">
      <div class="ctc-login-left"></div>
      <div class="ctc-login-right">
        <div class="title">登 录 - or - 注 册</div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="login-form">
          <el-form-item label="账 号" prop="username">
            <el-input
              type="text"
              placeholder="用户名 / 手机号"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密 码" prop="password">
            <el-input type="password" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <ctc-footer class="ctc-footer"></ctc-footer>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ctcFooter from '@/components/layouts/Footer.vue'
const { version } = require('../../package.json')
export default {
  name: 'Login',
  components: {
    ctcFooter
  },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名 / 手机号'))
      } else {
        if (this.ruleForm.username !== '') {
          this.$refs.ruleForm.validateField('pass')
        }
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      softVersion: `v${version}`,
      ruleForm: {
        username: '韩嘉琛',
        password: '123123'
      },
      rules: {
        password: [{ validator: validatePassword, trigger: 'blur' }],
        username: [{ validator: validateUsername, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions({
      doLogin: 'user/doLogin',
      fetchMenu: 'user/fetchMenu'
    }),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.$router.push('/')
          // const res = await this.doLogin(this.ruleForm)
          // const { code, data } = await this.fetchMenu()
          // if (res === 200 && code === 200) {
          //   // TODO 动态菜单
          //   this.$router.push('/')
          // }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.ctc-login {
  height: 100vh;
  .ctc-header {
    position: relative;
    background: $topHeaderColor;
    padding: 0 20px;
    display: flex;
    align-items: center;
    z-index: 2;
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
  .ctc-main {
    padding: 0 12%;
    display: flex;
    justify-content: space-between;
    height: calc(100vh - #{$headerHeight} - 50px);
    align-items: center;
    .ctc-login-left {
      flex: 1;
      height: 600px;
      background: url('~@/assets/images/login/login-right-img.png') no-repeat 20% center;
    }
    .ctc-login-right {
      padding: 20px 0 40px;
      font-size: 14px;
      .title {
        margin: 20px 0;
      }
      .login-form {
        width: 100%;
        padding: 0 60px 0 30px;
      }

      display: flex;
      align-items: center;
      flex-direction: column;
      width: 340px;
      margin: 20px;
      box-shadow: 0 0 10px 0 rgba(223, 227, 232, 0.5);
    }
  }

  .ctc-footer {
    color: #acb0b9;
    background-color: $bgGrey;
    text-align: center;
    line-height: $footerHeight;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 0;
  }
}
</style>
