<template>
  <div class="pt-editor">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <!-- v-model="html" -->
    <Editor
      :style="`height: ${height}px; overflow-y: hidden`"
      v-bind:value="editorValue"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from 'axios'

export default Vue.extend({
  components: { Editor, Toolbar },
  // 实现双向绑定
  model: {
    prop: 'editorValue',
    event: 'change'
  },
  props: {
    height: {
      // 编辑器高度
      type: Number,
      default: 500
    },
    editorValue: {
      // 编辑器的默认内容
      type: String,
      default: ''
    },
    mode: {
      // 显示工具类模式
      type: String,
      default: 'default' // 只有default与simple两个值
    }
  },
  data() {
    return {
      editor: null,
      // html: '<p>hello</p>', html从props中获取默认内容展示在编辑器上
      // 如果内容没有用p标签包裹 需要用p标签包裹
      html: this.editorValue.startsWith('<p>')
        ? this.editorValue
        : `<p>${this.editorValue}</p>`,
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      // mode: 'default', // or 'simple'
      showContent: '',

      // 编辑器配置上传图片接口
      editorConfig: {
        MENU_CONF: {
          uploadImage: {
            // server:
            //   'http://teach.komorebi-nxj.cn/api/teacher/point/uploadImage',
            fieldName: 'file',
            // 自定义增加 http  header
            // headers: {
            //   Cookie: document.cookie
            // },

            // 自定义上传
            customUpload(file, insertFn) {
              const form = new FormData()
              form.append('file', file, file.name)
              // console.log(form, 'form')
              // axios.defaults.withCredentials = true
              // document.cookie = document.cookie

              axios({
                url: 'http://teach.komorebi-nxj.cn/api/teacher/point/uploadImage',
                data: form,
                method: 'post'
                // headers: {
                //   Cookie: document.cookie
                // }
              }).then((res) => {
                console.log(file, 'file')
                // console.log(res)
                // 这里的参数分别是image标签的src alt herf
                console.log(res, 'res')
                insertFn(res.data.data.url, '', res.data.data.url)
              })
            }
          }
        }
      }
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },

    // 监听编辑器内容改变
    onChange(editor) {
      // console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
      this.$emit('change', this.editor.getHtml())
    }
  },

  mounted() {
    // console.log(document.cookie, ' document.cook')
  },

  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
