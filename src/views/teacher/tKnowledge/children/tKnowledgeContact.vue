<template>
  <div class="knowledge-contact">
    <div class="contact-content">
      <div class="contact-left"><Tree></Tree></div>
      <div class="contact-middle">
        <el-button type="primary">增加依赖</el-button>
      </div>
      <div class="contact-right"></div>
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
    min-height: 500px;
    display: flex;
    gap: 15px;
    .contact-left {
      width: 300px;
      background: #fff;
    }
    .contact-middle {
      height: 200px;
      flex: 1;
      background: #fff;
      margin-top: 150px;
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