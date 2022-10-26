<template>
  <div class="preview">
    <div class="preview-head"></div>
    <div class="preview-content">
      <div class="preview-list wrap-v4">
        <div class="preview-title"><h3>标题</h3></div>
        <Card
          v-for="(item, index) in this.problemsList"
          :key="index"
          :typeProblem="item"
          :index="index"
        ></Card>
      </div>
      <div class="preview-menu wrap-v5">
        <div class="preview-operation"></div>
        <div class="preview-score"></div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Card from "components/teacher/Test/tCard.vue";
import { group } from "utils/groupByType";
export default {
  name: "preview",
  data() {
    return {
      problemsList: [],
    };
  },
  created() {
    this.getProblems();
  },
  methods: {
    getProblems() {
      this.problemsList = group(this.$store.state.tTest.selectProblem);
      console.log(this.problemsList);
    },
    /*  typeFilter(param) {
      return singleType(this.problemsList, param);
    }, */
  },
  components: {
    Card,
  },
};
</script>
  
  <style lang="less" scoped>
.preview {
  margin-top: 50px;
  .preview-head {
    height: 56px;
    background: #fff;
  }
  .preview-content {
    display: flex;

    .preview-list {
      background: #fff;
      margin-top: 20px;
      .preview-title{
        display: flex;
        justify-content: center;
        height: 50px;
        line-height: 50px;
      }
    }
    .preview-menu {
      margin: 15px 0 0 30px;

      .preview-operation {
        background: #fff;
        height: 80px;
      }
      .preview-score {
        min-height: 200px;
        background: #fff;
        margin-top: 15px;
      }
    }
  }
}
</style>