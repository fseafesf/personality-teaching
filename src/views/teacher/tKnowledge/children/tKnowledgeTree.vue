<template>
  <div class="knowledge-tree">
    <div class="left">
      <Tree @nodeClick="nodeClick" current-node-key />
    </div>
    <div class="content">
      {{ $store.state.tKnowledge.pointDetail.context }}
    </div>
  </div>
</template>

<script >
import Tree from 'components/teacher/knowledge/tree.vue';

export default {
  components: { Tree },
  data() {
    return {
    };
  },
  methods: {
    nodeClick(data) {
      console.log(data)
      // if (!data.parent_knp_id) return
      this.$store.dispatch('PointByIdActive', data.id)
    }
  },
};
</script>

<style lang="less" scoped>
.knowledge-tree {
  margin-top: 10px;

  display: flex;
  gap: 10px;

  .left,
  .content {
    min-height: 800px;
    background-color: #fff;
  }

  .content {
    flex: 1;
    padding: 10px;
  }
}
</style>