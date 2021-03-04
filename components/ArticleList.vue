<template>
  <div>
    <div class="articles container">
      <div class="row mt-10">
        <div
          class="article col-12"
          v-for="article in articles"
          :key="article._id"
        >
          <li
            class="list-group-item d-flex justify-content-between align-items-start mt-3"
          >
            <h4>{{ article.title }}</h4>
            <span>
              <Button
                @click="editPost(article._id)"
                class="btn btn-primary float-right"
                style="margin-left: 10px"
              >
                編輯
              </Button>
              <Button
                @click="deletePost(article._id)"
                class="btn btn-primary float-right"
              >
                刪除
              </Button>
            </span>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'view-design'
export default {
  name: 'ArticleList',
  props: ['articles'],
  components: {
    Button,
  },
  data: () => ({
    API_URL: 'http://localhost:3000/api/',
    post_exit: true,
    article: {
      id: '',
      title: '',
      description: '',
      article_res: '',
      imgUrl: '',
    },
  }),
  methods: {
    //delete post
    async deletePost(id) {
      let cnx = {
        id: id,
      }
      //這邊要加上刪除警示之提示
      //確認過後才會送出delete的消息
      await this.$axios({
        method: 'post',
        url: this.API_URL + 'post/delete',
        data: cnx,
      }).then((res) => {
        //沒有完成，因為畫面不會刷新；然後用v-if的話又會整個dom都消失
        console.log(res)
      })
    },
    //into post editor
    async editPost(id) {
      console.log(id)
      this.article.id = id
      let article_req = this.API_URL + 'post/' + id
      await this.$axios({
        method: 'GET',
        url: article_req,
      })
        .then((res) => {
          this.article.title = res.data.result.title
          this.article.description = res.data.result.description
          this.article.article_res = res.data.result.quill
          this.article.imgUrl = res.data.result.imgUrl
        })
        .then(() => {
          this.commitStore()
        })
        .then(() => {
          setTimeout(() => {
            this.$router.replace('/master/dashboard/edit')
          }, 1000)
        })
    },
    commitStore() {
      this.$store.commit('editPost/setEditId', this.article.id)
      this.$store.commit('editPost/setEditTitle', this.article.title)
      this.$store.commit(
        'editPost/setEditDescription',
        this.article.description
      )
      this.$store.commit('editPost/setEditContent', this.article.article_res)
      this.$store.commit('editPost/setEditImgUrl', this.article.imgUrl)
    },
  },
}
</script>

<style>
.card {
  overflow: hidden;
  transition: box-shadow 500ms;
}
.card:hover {
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
}
</style>
