<template>
  <div>
    <h1>歡迎{{ $auth.user }}</h1>
    <button class="button">
      <nuxt-link to="/master/dashboard/newpost/edit">新增文章</nuxt-link>
    </button>
    <ul class="list-group">
      <ArticleList :articles="articles" />
    </ul>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
// import Button from 'iview'
export default {
  layout: 'master',
  middleware: 'checkAuth',
  data() {
    return {
      articles: [],
    }
  },
  components: {
    ArticleList,
    // Button,
  },

  asyncData(context) {
    const API_URL = `http://localhost:3000/api/posts/`
    const article_req = API_URL + 'all'
    return context.app.$axios.get(article_req).then((res) => {
      const articles = res.data.result

      return { articles }
    })
  },
}
</script>

<style></style>
