<template>
  <section class="quill-editor-container">
    <Button @click="preview">預覽</Button>
    <Input v-model="title" placeholder="請輸入標題" />
    <!-- 選取圖片的 input -->

    <div class="file has-name">
      <label class="file-label">
        <input
          class="file-input"
          type="file"
          name="resume"
          ref="myFiles"
          @change="showFile"
        />
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">選擇上傳圖檔 </span>
        </span>
        <span class="file-name"> {{ showImgText }}</span>
      </label>
      <img :src="fs.thumbnail" width="200" />
    </div>

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
    <Button @click="test">測試按鈕</Button>
    <Button @click="publish">發布</Button>
    <Button @click="save">保存並退出</Button>
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
      showImgText: '目前尚未上傳',
      //上傳image時需要的常數
      file: null, // 準備拿 input type="file" 的值
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
        this.$store.commit('preview/setDelta', this.myQuillEditor.editor.delta)
      }
      this.$store.commit('preview/setContent', val)
      this.mounting = false
    },
    //用v-model綁定title，並控制Vuex狀態
    title(val) {
      if (this.mounting === false) {
        this.$store.commit('preview/setTitle', this.title)
      }
      this.$store.commit('preview/setTitle', val)
      this.mounting = false
    },
    //控制image 的 Vuex狀態
    file(val) {
      if (this.mounting === false) {
        this.$store.commit('preview/setImg', this.file)
      }
      this.$store.commit('preview/setImg', val)
      this.mounting = false
    },
  },

  methods: {
    //testing
    async test() {
      let imgUrl = await this.ImgSubmit()
      console.log(this.imgUrl)
    },

    //upload all data to backend through API and redirect to article page
    async publish() {
      let newTitle = this.title
      let newArticle = this.myQuillEditor.editor.delta
      let imgUrl = await this.ImgSubmit()

      let myValue = {
        title: newTitle,
        quill: JSON.stringify(newArticle),
        imgUrl: imgUrl,
      }

      this.$axios({
        method: 'post',
        url: this.API_URL + 'post/new',
        data: myValue,
      }).then((res) => {
        let id = res.data
        this.$router.replace(`/article/${id}`)
      })
    },
    async save() {
      //todo
      console.log('will save the post and redirect to dashboard')
    },

    //article preview, route to /preview
    preview() {
      this.$router.replace('/master/dashboard/newpost/preview')
    },

    //upload imaage to Imgur and return img url
    async ImgSubmit() {
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
      // this.$emit('update:content', this.qcontent)
    },
  },
  computed: {
    ...mapGetters('preview', ['delta', 'curContent', 'curTitle', 'imgFile']),
  },
  mounted() {
    this.mounting = true
    if (!this.qcontent && this.curContent) {
      this.qcontent = this.curContent
    }
    if (this.curTitle) {
      this.title = this.curTitle
    }
    if (!this.file && this.imgFile) {
      this.file = this.imgFile
      this.fs.thumbnail = window.URL.createObjectURL(this.imgFile)
    }
  },
}
</script>

<style scope>
.quill-editor-container {
  margin: 10px 10px 10px 10px;
}
.ql-editor {
  height: 72vh;
}
</style>
