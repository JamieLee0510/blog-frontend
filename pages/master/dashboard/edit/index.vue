<template>
  <section class="quill-editor-container">
    <Button @click="preview">預覽</Button>
    <Button @click="backToList">回到列表</Button>
    <Input v-model="title" placeholder="請輸入標題" />
    <!-- 選取圖片的 input -->
    <div>
      <label for="file-upload" class="custom-file-upload">
        <i class="fas cloud-upload-alt"></i>{{ showImgText }}
      </label>
      <input
        ref="myFiles"
        id="file-upload"
        type="file"
        accept="image/*"
        @change="showFile"
      />
      <img :src="fs.thumbnail" width="200" />
    </div>

    <div
      class="quill-editor"
      :content="qcontent"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      v-quill:myQuillEditor="editorOption"
    ></div>
    <Button @click="updatePost">更新文章</Button>
  </section>
</template>

<script>
import Vue from 'vue'
import { Button, Input } from 'iview'
// import axios from '@nuxtjs/axios'
import { mapGetters } from 'vuex'
export default {
  components: {
    Button,
    Input,
  },
  // props: {
  //   content: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    const self = this
    return {
      API_URL: 'http://localhost:3000/api/',
      qcontent: this.content,
      editorOption: null,
      title: '',
      fs: {
        name: '', // input的圖檔名稱
        thumbnail: '', // input的圖片縮圖
        size: null, // input的圖片大小
      },
      showImgText: '選擇上傳圖檔',
      //上傳image時需要的常數
      file: null, // 準備拿 input type="file" 的值

      testingContent: '',
    }
  },
  // 在Nuxt.js框架中因為是後端渲染，所以為了使用image上傳外掛，在此處初始化和引入vue-quill-editor和quill-image-extend-module外掛
  beforeMount() {
    const VueQuillEditor = require('vue-quill-editor/dist/ssr')
    const Quill = require('quill')
    this.editorOption = {
      bounds: 'app',
      placeholder: '',
      modules: {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['blockquote', 'code-block'],
            [{ script: 'sub' }, { script: 'super' }],
            ['link', 'image', 'video'],
          ],
        },
      },
    }
    Vue.use(VueQuillEditor)
  },

  watch: {
    //用v-model綁定qcontent，並控制Vuex狀態
    qcontent(val) {
      if (this.mounting === false) {
        this.$store.commit(
          'editPost/setEditDelta',
          this.myQuillEditor.editor.delta
        )
      }
      this.$store.commit('editPost/setEditContent', val)
      this.mounting = false
    },
    //用v-model綁定title，並控制Vuex狀態
    title(val) {
      if (this.mounting === false) {
        this.$store.commit('editPost/setEditTitle', this.title)
      }
      this.$store.commit('editPost/setEditTitle', val)
      this.mounting = false
    },
    //控制image 的 Vuex狀態
    file(val) {
      if (this.mounting === false) {
        this.$store.commit('editPost/setEditImgFile', this.file)
      }
      this.$store.commit('editPost/setEditImgFile', val)
      this.mounting = false
    },
  },

  methods: {
    //upload all data to backend through API and redirect to article page
    //要改成“Update”
    async updatePost() {
      let newTitle = this.title
      let newArticle = this.myQuillEditor.editor.delta

      let imgUrl = await this.ImgSubmit()
      let article_id = this.article_id
      let myValue = {
        _id: article_id,
        title: newTitle,
        quill: JSON.stringify(newArticle),
        imgUrl: imgUrl,
      }

      this.$axios({
        method: 'post',
        url: this.API_URL + 'post/update',
        data: myValue,
      }).then(() => {
        this.$router.replace(`/article/${article_id}`)
      })
    },

    //article preview, route to /preview
    preview() {
      this.$router.replace('/master/dashboard/preview')
    },

    //upload imaage to Imgur and return img url
    async ImgSubmit() {
      if (this.article_img_file === undefined) {
        return this.article_img_url
      } else {
        try {
          const token = 'ac4ee773ef8513e3017dce13b621311dc3a5dc86'
          const album = 'ZgdaBCx' // 指定傳到該相簿的 ID
          let formData = new FormData()
          formData.append('image', this.file)
          formData.append('album', album) // 指定的相簿

          let dataUrl = await this.$axios({
            method: 'POST',
            url: 'https://api.imgur.com/3/image',
            data: formData,
            headers: {
              Authorization: 'Bearer ' + token, //放置申請的Client-ID
            },
            mimeType: 'multipart/form-data',
          })
          return dataUrl.data.data.link
        } catch (e) {
          console.log(e.message)
          console.log(e.name)
        }
      }
    },

    //show the image thumbnail
    showFile() {
      this.file = this.$refs.myFiles.files[0]
      this.fs.name = this.file.name // input的圖檔名稱
      this.fs.size = Math.floor(this.file.size * 0.001) + 'KB' // input的圖片大小
      this.fs.thumbnail = window.URL.createObjectURL(this.file) // input的圖片縮圖
      this.showImgText = '更換圖片'
    },

    //default
    onEditorBlur(editor) {
      // this.$emit('update:number', editor.getText().trim().length)
    },
    onEditorFocus(editor) {},
    onEditorReady(editor) {
      // this.$emit('update:number', editor.getText().trim().length)
    },
    onEditorChange({ editor, html, text }) {
      this.qcontent = html
    },

    //back to dashboard
    backToList() {
      //init Vuex of editPost
      this.$store.commit('editPost/setEditId', '')
      this.$store.commit('editPost/setEditTitle', '')
      this.$store.commit('editPost/setEditDelta', undefined)
      this.$store.commit('editPost/setEditImgUrl', '')
      this.$store.commit('editPost/setEditImgFile', undefined)

      //then back to dashboard by replace the url
      setTimeout(() => {
        this.$router.replace('/master/dashboard')
      }, 0)
    },
  },
  computed: {
    ...mapGetters('editPost', [
      'article_id',
      'article_title',
      'article_content',
      'article_img_url',
      'article_img_file',
      'article_delta',
      'article_preview',
    ]),
  },
  mounted() {
    this.mounting = true
    //待修改
    if (
      this.article_preview === false &&
      !this.qcontent &&
      this.article_content
    ) {
      const Quill = require('quill')
      const p = document.createElement('article')
      const quill = new Quill(p, {})
      const p_content = JSON.parse(this.article_content)
      quill.setContents(p_content)
      this.qcontent = p.children[0].innerHTML
    } else if (this.article_preview && !this.qcontent && this.article_content) {
      this.qcontent = this.article_content
      this.$store.commit('editPost/setPreviewState', false)
    }
    if (this.article_title) {
      this.title = this.article_title
    }
    if (!this.file && this.article_img_url) {
      this.fs.thumbnail = this.article_img_url
    }
  },
}
</script>

<style scope>
.ql-editor {
  height: 72vh;
}
</style>
