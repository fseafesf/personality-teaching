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
import COS from 'cos-js-sdk-v5'

import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { uploadImageApi } from '@/services/modules/common/upload'

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
            // server:
            //   'http://teach.komorebi-nxj.cn/api/teacher/point/uploadImage',
            fieldName: 'file',

            // 自定义上传 并压缩
            async customUpload(file, insertFn) {
              console.log(file, 'file')

              // 1.定义文件阅读器 获取图片文件原本数据
              const readObj = new FileReader()

              // 2.压缩图片
              readObj.onload = async () => {
                // 获取图片原始的base64数据
                // console.log(readObj.result, 'readObj.result')

                // 2.1 创建canvas于img标签 通过canvas压缩图片
                let canvas = document.createElement('canvas')
                let img = document.createElement('img')

                // 2.2 给img标签赋值原本的base64数据
                img.src = readObj.result

                // 2.3 开始压缩
                img.onload = async () => {
                  // 压缩从如下宽高 宽度、高度看需求
                  // 2.3.1 定义压缩起始位置 压缩多少宽高
                  // 获取图片的宽高 通过宽高比例进行压缩 如果把300下调成100 压更模糊 更小 反之亦然
                  // console.log(img.width, img.height)
                  canvas.width = 300
                  canvas.height = 300 * (img.height / img.width)
                  let ctx = canvas.getContext('2d')
                  // 0 0 代表左上角开始 300代表宽高
                  ctx.drawImage(img, 0, 0, 300, 300 * (img.height / img.width))

                  // 2.3.2 压缩语法 压缩后返回新的base64
                  // canvas.toDataURL(type,encoderOptions)
                  // toDataURL用于将canvas对象转为base64位编码
                  // type表示图片格式 默认为image/png
                  // encoderOptions 0到1之间取值，用于表示图片质量
                  let newImgBase64 = canvas.toDataURL(file.type, 10 / 100)
                  // console.log(newImgBase64)

                  // 2.3.3 调用dataURLtoFile方法 把压缩后的base64转为file文件
                  const newFile = self.dataURLtoFile(
                    newImgBase64,
                    file.name,
                    file.type
                  )
                  console.log(newFile, 'newFile')

                  // 2.3.4 创建form表单 把压缩后的文件放大form中发请求上传图片
                  const form = new FormData()
                  form.append('file', newFile, newFile.name)
                  const res = await uploadImageApi(form)

                  // 2.3.5 调用wangEditor的inserFn方法把路径插入到img标签
                  insertFn(res.data.url, '', '')
                }
              }

              // 3.这个必须要 不然readObj.onload不起作用
              readObj.readAsDataURL(file)
            }
          },

          // 视频生成
          uploadVideo: {
            // 自定义上传
            async customUpload(file, insertFn) {
              console.log(file)
              // 1.获取cos密钥
              let cos = new COS({
                SecretId: 'AKIDsXx1yhNvKWdYFiwxjIchcLo11lGbjbFn',
                SecretKey: 'zkHeqpdEajeKptpX2HVUN3XoulU1LUjn'
              })

              // 2.上传视频 uploadFile方法上传文件时，如果上传的文件大小大于等于5MB，则会自动分片上传 默认的分片大小为8MB。但是可以通过在options参数中设置partSize属性来自定义分片大小
              cos.uploadFile(
                {
                  Bucket: 'video-1309614912',
                  Region: 'ap-guangzhou' /* 存储桶所在地域，必须字段 */,
                  Key: 'test1.mp4', // 文件名
                  Body: file, // 上传文件对象
                  SliceSize: 1024 * 1024 * 5, // 大于5M分块上传
                  onProgress: function (progressData) {
                    console.log(JSON.stringify(progressData))
                  },
                  onFileFinish: function (err, data, options) {
                    console.log(options.Key + '上传' + (err ? '失败' : '完成'))
                  }
                },
                (err, data) => {}
              )

              // 3.获取视频url
              cos.getObjectUrl(
                {
                  Bucket: 'video-1309614912',
                  Region: 'ap-guangzhou' /* 存储桶所在地域，必须字段 */,
                  Key: 'test1.mp4', // 文件名
                  Sign: true /* 获取带签名的对象 URL */
                },
                function (err, data) {
                  if (err) return console.log(err)
                  /* url为对象访问 url */
                  var url = data.Url
                  /* 复制 downloadUrl 的值到浏览器打开会自动触发下载 */
                  var downloadUrl =
                    url +
                    (url.indexOf('?') > -1 ? '&' : '?') +
                    'response-content-disposition=attachment' // 补充强制下载的参数

                  // 最后插入视频标签
                  insertFn(downloadUrl)
                }
              )
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
    },

    // 将base64转成file文件方法
    dataURLtoFile(dataurl, filename, type) {
      // 获取到base64编码
      const arr = dataurl.split(',')
      // 将base64编码转为字符串
      const bstr = window.atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n) // 创建初始化为0的，包含length个元素的无符号整型数组
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, {
        type: type
      })
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
