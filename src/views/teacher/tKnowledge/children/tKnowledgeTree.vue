<template>
  <div class="knowledge-tree">
    <div class="left">
      <Tree />
    </div>
    <div class="content">
      知识点内容
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
  // mounted() {
  //   this.$store.dispatch('PointListActive')
  // },
  methods: {
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