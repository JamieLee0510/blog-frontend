<template>
  <div>
    <TestHeader />
    <body>
      <nuxt />
    </body>
    <Footer></Footer>
  </div>
</template>

<script>
import TestHeader from '../components/TestHeader'
import Footer from '../components/Footer'
export default {
  components: {
    TestHeader,
    Footer,
  },
}
</script>

<style>
body {
  height: 100%;
}
</style>
