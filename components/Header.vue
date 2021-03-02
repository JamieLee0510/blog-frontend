<template>
  <div>
    <nav class="navbar navbar-light fixed-top" :style="{ background: color }">
      <a class="navbar-brand" href="/">王冠瑋律師</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              關於我
              <!-- <span class="sr-only">(current)</span> -->
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">服務項目</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/articles">法律文章</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">如何聯絡我</a>
          </li>
        </ul>
        <div class="media_icon">
          <a href="#"><i class="fab fa-youtube"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-facebook-square"></i></a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: 'LightGrey',
    }
  },
  mounted() {
    //在window上掛載滑動監聽事件
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    //然後在方法中，添加這個handleScroll方法來獲取滾動的位置
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop

      //設置背景顏色的透明度
      if (scrollTop) {
        this.color = `rgba(255, 255, 255,${scrollTop / (scrollTop + 40)})`
        console.log(scrollTop)
      } else if (scrollTop == 0) {
        this.color = 'LightGrey'
        console.log(scrollTop)
      } else if (scrollTop != 0) {
        this.color = 'yellow'
        console.log(scrollTop)
      }
    },
  },
  //由於是在整個window中添加的事件，所以要在頁面離開時摧毀掉，否則會報錯
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
/* navbar setting */
.navbar {
  width: 100vw;
}
</style>
