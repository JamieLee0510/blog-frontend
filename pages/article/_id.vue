<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="title col-12 mt-10">
          <h1>{{ title }}</h1>
        </div>
        <div class="col-4 mt-10">
          <h3>發布於：{{ publish_time }}</h3>
        </div>
        <div
          class="aritcle_img"
          style="width: 400px; height: 200px; border: 2px"
        >
          <img
            :src="imgUrl"
            alt=""
            style="width: 100%; height: 100%; object-fit: cover"
          />
        </div>
        <div class="content-view col-12 mt-10" ref="contentContainer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'guest',
  data() {
    return {
      title: '',
      article_res: undefined,
      imgUrl: '',
      article_id: '',
      publish_time: '',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '測試meta description',
        },
      ],
    }
  },
  asyncData({ $axios, params }) {
    const API_URL = `http://localhost:3000/api/post/`
    const article_req = API_URL + params.id

    return $axios.get(article_req).then((res) => {
      const article_res = res.data.result.quill
      const title = res.data.result.title
      const imgUrl = res.data.result.imgUrl.toString()
      const article_id = params.id
      const publish_time = res.data.result.createdAt
      return { title, article_res, imgUrl, article_id, publish_time }
    })
  },

  mounted() {
    const Quill = require('quill')
    console.log(this.article_res)
    const article = document.createElement('article')
    const article_content = JSON.parse(this.article_res)
    console.log(article_content)

    const quill = new Quill(article, {})
    quill.setContents(article_content)
    setTimeout(() => {
      this.$refs.contentContainer.appendChild(article)
    }, 1000)
  },

  // methods: {
  //   commitStore() {
  //     this.$store.commit('editPost/setEditId', this.$route.params.id)
  //     this.$store.commit('editPost/setEditTitle', this.title)
  //     this.$store.commit('editPost/setEditContent', this.article_res)
  //     this.$store.commit('editPost/setEditImgUrl', this.imgUrl)
  //   },
  // },
}
</script>

<style>
.title {
  text-align: center;
}
</style>
