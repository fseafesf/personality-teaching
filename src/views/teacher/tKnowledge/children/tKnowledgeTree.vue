<template>
  <div class="knowledge-tree">
    <div class="left">
      <tTree @nodeClick="nodeClick" :currentNode="currentNode" />
    </div>
    <div class="right">
      <div class="title">
        {{ pointDetail ? pointDetail.name : '请点击知识点查看内容' }}
      </div>
      <div class="content">
        {{ pointDetail?.context }}
      </div>
    </div>
  </div>
</template>

<script>
import tTree from 'components/teacher/knowledge/tTree.vue'

export default {
  components: { tTree },
  data() {
    return {
      currentId: ''
    }
  },
  methods: {
    // 点击知识点
    nodeClick(data) {
      if (data.id == this.currentId) return
      this.currentId = data.id
      // 会把当前知识点id存到vuex中
      this.$store.dispatch('PointByIdActive', data.id)
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
    width: 400px;
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
