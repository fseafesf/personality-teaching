<template>
  <div
    class="pt-editor"
    style="border: 1px solid #ccc; border-radius: 5px; overflow: auto"
  >
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />

    <Editor
      class=""
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

import { uploadImg, uploadVideo } from '@/utils/uploadTools'

// 可以直接v-model双向绑定使用
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
      // 编辑器的默认内容 这个不需要传 直接通过v-model绑定即可
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
    // self用来实现在data中调用method的方法
    let self = this
    return {
      editor: null,
      // html: '<p>hello</p>', html从props中获取默认内容展示在编辑器上
      // 如果内容没有用p标签包裹 需要用p标签包裹
      html: this.editorValue.startsWith('<p>')
        ? this.editorValue
        : `<p>${this.editorValue}</p>`,
      toolbarConfig: {
        excludeKeys: [
          'blockquote', // 取消引用
          'bgColor', // 取消背景色
          'todo', // 取消待办
          'emotion', // 取消表情
          // 'group-video', // 取消视频
          'fullScreen', // 取消全屏
          'insertTable' // 取消表格
        ]
      },
      editorConfig: { placeholder: '请输入内容...' },
      // mode: 'default', // or 'simple'
      showContent: '',

      // 编辑器配置上传图片接口
      editorConfig: {
        MENU_CONF: {
          // 图片上传
          uploadImage: {
            fieldName: 'file',
            // 自定义上传 并压缩
            async customUpload(file, insertFn) {
              uploadImg(file, insertFn)
            }
          },

          // 视频生成
          uploadVideo: {
            // 自定义上传
            async customUpload(file, insertFn) {
              uploadVideo(self.editor, file, insertFn)
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
<style>
.w-e-progress-bar {
  height: 5px;
  background-color: rgb(10, 251, 10);
}

/* .w-e-progress-bar::after {
  content: '✔';
  right: 0;
  top: 0;
  position: absolute;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  background-color: rgb(10, 251, 10);
} */

/* .w-e-textarea-video-container::after {
  content: '✔';
  right: 0;
  top: 0;
  position: absolute;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  background-color: rgb(10, 251, 10);
} */
</style>
