<template>
  <div>
    <body style="padding-top: 70px">
      <Button type="primary" @click="returnEdit">回到編輯</Button>
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
      this.$router.replace('/master/dashboard/newpost/edit')
    },
  },
  computed: {
    ...mapGetters('preview', ['delta', 'curTitle', 'imgFile']),
  },
  mounted() {
    const Quill = require('quill')
    const article = document.createElement('article')
    //用Quill來解碼，先把新建的dom節點放到quill裡面
    let quill = new Quill(article, {})
    quill.setContents(this.delta)

    //image 預覽
    setTimeout(() => {
      this.file = this.imgFile
      this.fs.imgUrl = window.URL.createObjectURL(this.imgFile) // input的圖片縮圖
    }, 0)

    //這邊用setTimeout是為了保證quill先拿到數據，再放到dom節點上
    setTimeout(() => {
      this.$refs.contentContainer.appendChild(article)
    }, 0)

    this.title = this.curTitle
  },
}
</script>

<style></style>
