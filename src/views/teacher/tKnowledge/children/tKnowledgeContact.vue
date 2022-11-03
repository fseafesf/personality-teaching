<template>
  <div class="knowledge-contact">
    <div class="contact-content">
      <div class="contact-left">
        <Tree :show-checkbox="true" :operation="false"></Tree>
      </div>
      <div class="contact-middle">
        <el-button type="primary">增加依赖</el-button>
      </div>
      <div class="contact-right">
        <Tree :operation="false" :height="800"></Tree>
      </div>
      <div class="contact-result"></div>
    </div>
  </div>
</template>

<script >
import Tree from "components/teacher/knowledge/tree.vue";

export default {
  name: "contact",
  data() {
    return {};
  },
  components: {
    Tree,
  },
};
</script>

<style lang="less" scoped>
.knowledge-contact {
  margin-top: 10px;
  overflow: auto;

  .contact-content {
    display: flex;
    gap: 15px;
    justify-content: space-between;
    align-items: center;

    .contact-left {
      width: 300px;
      min-height: 800px;
      background: #fff;
    }

    .contact-right {
      width: 300px;
      min-height: 800px;
      background: #fff;
    }

    .contact-result {
      width: 300px;
      min-height: 800px;
      background: #fff;
    }
  }
}
</style>