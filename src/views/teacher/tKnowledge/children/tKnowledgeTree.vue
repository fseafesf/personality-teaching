<template>
  <div class="knowledge-tree">
    <div class="left">
      <el-button
        class="add-btn"
        type="primary"
        size="mini"
        plain
        @click="handleAddClick"
        >添加一级知识点</el-button
      >
      <tTree @nodeClick="nodeClick" :currentNode="currentNode" />
    </div>
    <div class="right">
      <div class="title">
        {{ pointDetail ? pointDetail.name : '请点击知识点查看内容' }}
      </div>

      <!-- 展示内容 -->
      <div class="content" v-if="pointDetail?.context">
        <div v-html="HTMLDecode(pointDetail?.context)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import tTree from 'components/teacher/knowledge/tTree.vue'
import { HTMLDecode } from '@/utils/htmlUtil'

export default {
  components: { tTree },
  data() {
    return {
      currentId: '',
      HTMLDecode // 将结果加密的HTML标签内容解密展示的方法
    }
  },
  methods: {
    // 点击知识点
    nodeClick(data) {
      if (data.id == this.currentId) return
      this.currentId = data.id
      // 会把当前知识点id存到vuex中
      this.$store.dispatch('PointByIdActive', data.id)
    },

    // 添加一级知识点
    handleAddClick() {
      // 1代表添加一级知识点 用于在添加知识点页面是区分一级知识点
      this.$router.push({ path: '/teacher/knowledge/add/' + 1 })
    }
  },
  computed: {
    pointDetail: function () {
      return this.$store.state.tKnowledge.pointDetail.info
    },

    // 获取选中的当前知识点id
    currentNode() {
      return this.$store.state.tKnowledge.currentNode
    }
  }
}
</script>

<style lang="less" scoped>
.knowledge-tree {
  margin-top: 10px;

  display: flex;
  gap: 10px;

  .left,
  .right {
    min-height: 80vh;
    background-color: #fff;
    border-radius: 5px;
  }

  .left {
    .add-btn {
      margin: 10px;
    }

    width: 450px;
  }

  .right {
    flex: 1;
    padding: 20px;

    .title {
      font-size: 18px;
      font-weight: 700;
      color: #4498ee;
      margin-bottom: 10px;
    }
  }
}
</style>
