<template>
  <div class="articles container" style="margin-top: 30px">
    <div class="row">
      <div
        class="article col-4"
        v-for="article in articles"
        :key="article._id"
        style="margin-bottom: 10px"
      >
        <div class="card mt-2 ml-3" style="width: 18rem">
          <img :src="article.imgUrl" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">
              <nuxt-link
                style="color: black"
                :to="{ name: 'article-id', params: { id: article._id } }"
                >{{ article.title }}</nuxt-link
              >
            </h5>
            <p class="card-text">
              {{ article.description }}
            </p>
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
