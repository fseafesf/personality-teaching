<template>
  <div class="problem-head">
    <div class="head-content">
      <span>{{ this.toTypeH(this.Problem.type) }}题</span>
      <em>|</em>
      <span>常考题</span>
      <em>|</em>
      <span>{{ this.toDifficultH(this.Problem.level) }}题</span>
    </div>
  </div>
</template>

<script>
import { toType, toDifficult } from "@/utils/transfrom";
export default {
  name: "ProblemHead",
  data() {
    return {};
  },
  methods: {
    toTypeH(key) {
      return toType(key);
    },
    toDifficultH(key) {
      return toDifficult(key);
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
    span {
      color: #999;
    }
  }
}
</style>