<template>
  <div class="login">
    <div class="left-box">
      <div class="login-img"></div>
    </div>
    <div class="right-box">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="40px">
        <div class="mb-5 text-center">欢迎登录</div>
        <el-form-item label="账号" prop="username">
          <el-input type="text" placeholder="请输入账号" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名输入有误'))
      } else {
        if (this.ruleForm.username !== '') {
          this.$refs.ruleForm.validateField('password')
        }
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 登录
          const data = await this.$store.dispatch('doLogin', this.ruleForm)
          if (data) {
            // 获取菜单
            const asyncRoutes = await this.$store.dispatch('fetchMenu')
            if (asyncRoutes) {
              this.$notify({
                type: 'success',
                title: '成功',
                message: '登录成功',
                duration: 1000
              })
              this.$router.push('/home')
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
  .login{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
    .left-box{
      .login-img{
        width: 460px;
        height: 320px;
        background: url('~@@/img/login-ad.png') no-repeat;
      }
    }
    .right-box{
      padding: 50px 40px;
      border-radius: 4px;
      background: #fff;
      box-shadow: 0 0 10px 0 rgba(223,227,232,.5);
      width: 260px;
      .login-btn{
        .el-button{
          width: 100%;
        }
      }
    }
  }
</style>
