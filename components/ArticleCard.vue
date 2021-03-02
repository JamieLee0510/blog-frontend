<template>
  <div>
    <div class="articles container">
      <div class="row">
        <div
          class="article col-4"
          v-for="article in articles"
          :key="article._id"
        >
          <div class="card mt-2 ml-3">
            <img :src="article.imgUrl" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <p class="card-text">
                {{ article.content }}
              </p>
              <nuxt-link
                :to="{ name: 'article-id', params: { id: article._id } }"
                ><button class="btn btn-primary">閱讀全文</button></nuxt-link
              >
              <!-- <a :href="'/article/' + article._id" class="btn btn-primary"
                >閱讀全文</a
              > -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: ['articles'],
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
