<template>
  <div class="problem-head">
    <div class="head-content">
      <span>{{ this.toType(this.Problem.type) }}题</span>
      <em>|</em>
      <span>常考题</span>
      <em>|</em>
      <span>{{this.toDifficult(this.Problem.difficultType)}}题</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProblemHead",
  data() {return{}},
  methods: {
    toType(key) {
      switch (key) {
        case 1:
          return "单选";
        case 2:
          return "多选";
        case 3:
          return "计算";
        case 4:
          return "阅读";
        case 5:
          return "编程";
        default:
          break;
      }
    },
    toDifficult(key) {
      switch (key) {
        case 1:
          return "简单";
        case 2:
          return "中等";
        case 3:
          return "困难";

        default:
          break;
      }
    },
  },
  props: {
    Problem: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="less" scoped>
.problem-head {
  height: 40px;
  border-bottom: 1px solid #f5f5f5;
  padding: 0 20px;
  display: flex;
  align-items: center;
  .head-content {
    font-size: 12px;
    display: flex;
    gap: 10px;
    span{
      color: #999;
    }
  }
}
</style>