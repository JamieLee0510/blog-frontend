<template>
  <div>
    <body>
      <ArticleCard :articles="articles" />
    </body>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard.vue'
export default {
  data() {
    return {
      articles: [],
    }
  },
  components: {
    ArticleCard,
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
