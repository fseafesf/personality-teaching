<template>
  <div class="tree">
    <div class="custom-tree-container">
      <div class="block">
        <el-tree
          :data="treeData"
          ref="tree"
          node-key="id"
        >
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <div class="label">
              <span>{{ node.label }}</span>
            </div>
            <el-progress class="progressbar" :text-inside="true" :stroke-width="20" :percentage="percentage"></el-progress>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 70
    }
  },
  mounted() {
    // 第一次进入tTree和tTree编辑更新发请求 如果一个页面又两颗树 会请求两次 但无所谓了 这项目又没有几百万的请求量
    this.$store.dispatch('PointListActive')
    console.log(this.$store.state.tKnowledge.points)
  },

  computed: {
    treeData() {
      return this.$store.state.tKnowledge.points
    }
  },
}
</script>

<style lang="less" scoped>
.tree {
  height: 100%;

  .custom-tree-container {
    border-radius: 5px;

    .block {
      padding: 10px;
    }

    .custom-tree-node {
      display: flex;
      width: 100%;
      .progressbar {
        width: 260px;
        margin-left: 30px;
      }
    }
  }
}
</style>
