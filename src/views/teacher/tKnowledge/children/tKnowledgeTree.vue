<template>
  <div class="knowledge-tree">
    <div class="left">
      <Tree @nodeClick="nodeClick" :currentNode="currentNode" />
    </div>
    <div class="right">
      <div class="title">{{ pointDetail ? pointDetail.name : '请点击知识点查看内容' }}</div>
      <div class="content">
        {{ pointDetail?.context }}
      </div>
    </div>
  </div>
</template>

<script >
import Tree from 'components/teacher/knowledge/tree.vue';

export default {
  components: { Tree },
  data() {
    return {
      currentId: ''
    };
  },
  methods: {
    nodeClick(data) {
      if (data.id == this.currentId) return
      this.currentId = data.id
      this.$store.dispatch('PointByIdActive', data.id)
    }
  },
  computed: {
    pointDetail: function () {
      return this.$store.state.tKnowledge.pointDetail.info
    },
    currentNode() {
      return this.$store.state.tKnowledge.currentNode
    }
  }
};
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
      color: #4498EE;
      margin-bottom: 10px;
    }
  }
}
</style>