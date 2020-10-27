<template>
  <div class="login-wrap">
    <h1>愿者上钩后台管理系统</h1>
    <a-form-model
      ref="form"
      :model="formModel"
      :rules="rules"
      class="form"
    >
      <a-form-model-item
        has-feedback
        label="用户名"
        prop="username"
      >
        <a-input
          v-model="formModel.username"
          placeholder="请输入用户名"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color:rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item
        has-feedback
        label="密码"
        prop="password"
      >
        <a-input
          v-model="formModel.password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color:rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item class="btn-wrap">
        <a-button
          type="primary"
          :loading="loading"
          size="large"
          block
          @click="submit"
        >
          登录
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import md5 from 'md5'

export default {
  data () {
    return {
      formModel: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
          { min: 3, max: 50, message: '用户名长度为 3 至 50 个字符', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
          { min: 6, max: 50, message: '密码长度为 6 至 50 个字符', trigger: ['change', 'blur'] }
        ]
      },
      loading: false
    }
  },
  methods: {
    async submit () {
      const validateResult = await this.$refs.form.validate().then(() => true).catch(() => false)
      if (validateResult) {
        this.loading = true
        this.$request('/user/login', {
          username: this.formModel.username,
          password: md5(this.formModel.password)
        }, {
          mask: true
        }).then(res => {
          this.loginSuccess(res)
        }).finally(() => {
          this.loading = false
        })
      }
    },
    loginSuccess (res) {
      this.$message.success('登录成功')
      localStorage.setItem('token', res.token)
      localStorage.setItem('tokenExpired', res.tokenExpired)
      const redirect = this.$route.query.redirect
      this.$router.replace(redirect || '/')
    }
  }
}
</script>

<style lang="less" scoped>
  .login-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-top: 200px;
    height: 580px;
    .form {
      width: 400px;
    }
    .btn-wrap {
      padding-top: 20px;
    }
  }
</style>
