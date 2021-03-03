<template>
  <div class="input_area">
    <div class="testing">
      <section class="section">
        <div class="container">
          <div class="columns">
            <div class="column is-4 is-offset-4">
              <h2 class="title has-text-centered">Welcome back!</h2>

              <!-- <Notification :message="error" v-if="error" /> -->

              <form>
                <div class="field">
                  <label class="label">輸入信箱</label>
                  <input class="input" v-model="email" />
                  <error v-if="!email">信箱不可為空</error>
                </div>
                <div class="field">
                  <label class="label">輸入密碼</label>
                  <input class="input" v-model="password" />
                  <error v-if="!password">密碼不可為空</error>
                </div>
                <div class="field"></div>
              </form>
              <button class="button is-dark is-fullwidth" @click="login">
                登入
              </button>

              <!-- <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account?
              <nuxt-link to="/register">Register</nuxt-link>
            </p>
          </div> -->
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- <Form ref="loginFrom" :model="loginFrom" :label-width="80">
      <FormItem label="註冊信箱" width="300px">
        <Input
          v-model="loginFrom.email"
          style="width: 150px"
          placeholder="請輸入註冊信箱"
        />
      </FormItem>
      <FormItem label="密碼" width="300px">
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
    </Form> -->
  </div>
</template>

<script>
import Error from '~/components/Error.vue'
// import { Form, FormItem, Input, Button } from 'iview'
import error from '../../components/Error'
export default {
  name: 'Login',
  layout: 'master',
  components: {
    // Form,
    // FormItem,
    // Input,
    // Button,
    error,
  },
  data() {
    // 初始化數據
    return {
      API_URL: 'http://localhost:3000/api/',
      email: '',
      password: '',
      // loginFrom: {
      //   email: '',
      //   password: '',
      // },
    }
  },
  methods: {
    async login() {
      try {
        const loginFrom = {
          email: this.email,
          password: this.password,
        }
        await this.$auth.loginWith('local', {
          data: loginFrom,
        })
        this.$router.push('/master/dashboard')
      } catch (e) {
        this.error = e.response.data.message
      }
    },
    // async loginSubmit() {
    //   await this.$axios({
    //     method: 'post',
    //     url: this.API_URL + 'login3',
    //     data: this.loginFrom,
    //   })
    //     .then((res) => {
    //       if (localStorage) {
    //         localStorage.setItem('authToken', res.data.accessToken)
    //         localStorage.setItem('refreshToken', res.data.refreshToken)
    //       } else {
    //         console.log('沒有偵測到瀏覽器')
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })

    //   // if (err) {
    //   //   return console.log(err)
    //   // } else {
    //   //   if (localStorage) {
    //   //     console.log(result.data)
    //   //     // const access_token = result.data.accessToken
    //   //     // localStorage.setItem('authToken', access_token)
    //   //   }
    //   // }
    //   // // if (result.code === 200) {
    //   // //   Cookie.set('Authorization', result.data)
    //   // // }
    // },
  },
}
</script>

<style>
.input_area {
  margin-top: 50px;
  text-align: center;
}
</style>
