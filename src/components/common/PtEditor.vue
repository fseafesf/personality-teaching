<template>
  <div class="pt-editor">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />

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
import { uploadImageApi } from '@/services/modules/common/upload'

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

            // 自定义上传
            async customUpload(file, insertFn) {
              const form = new FormData()
              form.append('file', file, file.name)
              const res = await uploadImageApi(form)
              insertFn(res.data.url, '', '')
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

  mounted() {},

  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
