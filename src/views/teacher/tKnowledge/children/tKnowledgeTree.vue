<template>
  <div class="knowledge-tree">
    <Tree />
    <div class="content">
      知识点内容
    </div>
  </div>
</template>

<script >
import Tree from 'components/teacher/knowledge/tree.vue';

export default {
  data() {
    return {
    };
  },
  methods: {
  },
  components: { Tree }
};
</script>

<style lang="less" scoped>
.knowledge-tree {
  margin-top: 10px;

  display: flex;
  gap: 10px;

  .content {
    flex: 1;
    padding: 10px;
    background-color: #fff;
  }
}
</style>