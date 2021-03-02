<template>
  <div>
    <body style="padding-top: 70px">
      <Button type="primary" @click="returnEdit">回到編輯</Button>
      <Button type="primary" @click="testing">測試</Button>
      <div class="container">
        <div class="row">
          <div class="title col-12 mt-10">
            <h1>{{ title }}</h1>
          </div>
          <img :src="fs.imgUrl" alt="" />
          <div class="content-view" ref="contentContainer"></div>
        </div>
        <!-- <button class="btn btn-success" @click="testingImg">測試按鈕</button> -->
      </div>
    </body>
  </div>
</template>

<script>
import { Button } from 'iview'
import { mapGetters } from 'vuex'

export default {
  components: {
    Button,
  },
  data: () => ({
    title: '',
    file: '',
    fs: {
      imgUrl: '',
    },
  }),
  methods: {
    returnEdit() {
      this.$store.commit('editPost/setPreviewState', true)
      setTimeout(() => {
        this.$router.replace('/master/dashboard/edit')
      }, 0)
    },
    testing() {
      console.log(this.article_content)
    },
  },
  computed: {
    ...mapGetters('editPost', [
      'article_content',
      'article_title',
      'article_img_file',
      'article_img_url',
      'article_delta',
      'article_preview',
    ]),
  },
  mounted() {
    const article = document.createElement('article')
    if (this.article_preview === false) {
      article.innerHTML = this.article_content
    } else {
      const Quill = require('quill')
      //用Quill來解碼，先把新建的dom節點放到quill裡面
      let quill = new Quill(article, {})
      quill.setContents(this.article_delta)
    }

    //image 預覽
    setTimeout(() => {
      if (this.article_img_file === undefined) {
        this.fs.imgUrl = this.article_img_url
      } else {
        this.file = this.article_img_file
        this.fs.imgUrl = window.URL.createObjectURL(this.file) // input的圖片縮圖
      }
    }, 0)

    //這邊用setTimeout是為了保證quill先拿到數據，再放到dom節點上
    setTimeout(() => {
      this.$refs.contentContainer.appendChild(article)
    }, 0)

    this.title = this.article_title
  },
}
</script>

<style></style>
