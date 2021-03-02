<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      variant="secondary"
      fixed="top"
      sticky="true"
    >
      <b-navbar-brand href="/">王冠瑋律師</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/article">法律文章</b-nav-item>

          <!-- <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form> -->

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  beforeMount() {
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
      //   if (scrollTop) {
      //     this.color = `rgba(255, 255, 255,${scrollTop / (scrollTop + 40)})`
      //     console.log(scrollTop)
      //   } else if (scrollTop == 0) {
      //     this.color = 'LightGrey'
      //     console.log(scrollTop)
      //   } else if (scrollTop != 0) {
      //     this.color = 'yellow'
      //     console.log(scrollTop)
      //   }
    },
  },
  //由於是在整個window中添加的事件，所以要在頁面離開時摧毀掉，否則會報錯
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style></style>
