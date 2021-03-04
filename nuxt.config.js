const webpack = require('webpack')

export default {
  // 是否為開發環境
  dev: process.env.NODE_ENV !== 'production',

  cache: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt_blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // {
      //   rel: 'stylesheet',
      //   type: 'text/css',
      //   href:
      //     'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
      // },
      {
        rel: 'stylesheet',
        href:
          '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css',
      },

      //for fontawesome
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // 加上下面這段fontawesome
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    //從iview修改為view-design
    'view-design/dist/styles/iview.css',
    // 'iview/dist/styles/iview.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~plugins/ViewUI', ssr: false },
    // { src: '~plugins/iview', ssr: false },
    { src: '~plugins/vue-quill-editor.js', ssr: false },
    { src: '~plugins/bootstrap-vue.js', ssr: false },
    // { src: '~/plugins/font-awesome' },
  ],

  script: [
    // {
    //   src:
    //     'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js',
    // },
    // { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
    // {
    //   src:
    //     'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js',
    // },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],

  // nuxt.config.js

  //axios的部分，這個要在前後端都結合到Nuxt上時再調整,同時也和@auth共享
  axios: {
    baseURL: 'http://127.0.0.1:3000/api',
  },

  auth: {
    strategies: {
      local: {
        // token: {
        //   property: 'token',
        //   // required: true,
        //   // type: 'Bearer'
        // },
        endpoints: {
          login: { url: 'login3', method: 'post', propertyName: 'accessToken' },
          user: { url: 'user', method: 'get', propertyName: 'data' },
          logout: false,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ['axios', 'element-ui', 'vue-quill-editor', 'vee-validate'],

    //為解決 “The “path“ argument must be of type string. Received undefined”
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        Quill: 'quill/dist/quill.js',
      }),
    ],
  },
}
