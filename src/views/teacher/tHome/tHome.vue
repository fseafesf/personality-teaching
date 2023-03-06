<template>
  <div>
    <PtEditor :height="300" v-model="content" />
    <el-button @click="handleAdd">添加</el-button>

    <br />

    <!-- 展示获取发请求的富文本内容 -->
    <div v-html="showContent"></div>
    {{ content }}
  </div>
</template>

<script>
import Vue from 'vue'
import PtEditor from '@/components/common/PtEditor.vue'
import axios from 'axios'

export default Vue.extend({
  components: { PtEditor }, // 导入富文本编辑器组件
  data() {
    return {
      content: '', // 用来双向绑定富文本内容
      showContent: ''
    }
  },
  methods: {
    handleAdd() {
      axios({
        url: 'http://localhost:3000/api/article',
        data: {
          title: '测试',
          content: this.content,
          categoryId: 1
        },
        method: 'post'
      }).then((res) => {
        console.log(res.data)
        const articleId = res.data.data.id
        axios
          .get('http://localhost:3000/api/article/' + articleId)
          .then((res) => {
            console.log(res.data)
            this.showContent = res.data.data.content
          })
      })
    }
  },
  mounted() {
    // axios.get('http://localhost:3000/api/category').then((res) => {
    //   console.log(res.data)
    // })
  }
})
</script>
