<template>
  <div>
    {{ $auth.user }}
    <Form ref="loginFrom" :model="loginFrom" :label-width="80">
      <!-- <FormItem label="使用者帳號" width="100">
        <Input
          v-model="loginFrom.username"
          style="width: 150px"
          placeholder="請輸入使用者帳號"
        />
      </FormItem> -->
      <FormItem label="註冊信箱" width="100">
        <Input
          v-model="loginFrom.email"
          style="width: 150px"
          placeholder="請輸入註冊信箱"
        />
      </FormItem>
      <FormItem label="密碼" width="100">
        <Input
          v-model="loginFrom.password"
          style="width: 150px"
          placeholder="請輸入密碼"
          show-password
        />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="login"> 登入 </Button>
        <Button type="primary" @click="testing"> 測試按鈕 </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'view-design'
// const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'Login',
  layout: 'master',
  components: {
    Form,
    FormItem,
    Input,
    Button,
  },
  data() {
    // 初始化數據
    return {
      API_URL: 'http://localhost:3000/api/',
      loginFrom: {
        // username: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.loginFrom,
          // data: {

          //   email: this.email,
          //   password: this.password
          // }
        })
        this.$router.push('/master/dashboard')
      } catch (e) {
        this.error = e.response.data.message
      }
    },
    testing() {
      if (localStorage) {
        localStorage.setItem('authToken', 123)
        console.log('success')
      } else {
        console.log('none')
      }
    },
  },
}
</script>

<style></style>
