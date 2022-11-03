<template>
  <div class="card">
    <div class="card-type">
      <h3>
        <span>{{ this.index + 1 }}、</span>
        <span>{{ this.toType(this.typeProblem.type) }}</span>
      </h3>
    </div>
    <div class="card-list">
      <Problem v-for="(item, index) in this.typeProblem.data" :key="index">{{
        item.content
      }}</Problem>
    </div>
  </div>
</template>

<script>
import Problem from "components/teacher/Test/tTest/tproblem.vue";
export default {
  name: "card",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toType(key) {
      switch (key) {
        case 1:
          return "单选";
        case 2:
          return "多选";
        case 3:
          return "填空";
        case 4:
          return "判断";
        case 5:
          return "简答";
        default:
          break;
      }
    },
  },
  props: {
    typeProblem: {
      type: Object,
      default: function () {
        return {};
      },
    },
    index: {
      type: Number,
    },
  },
  components: {
    Problem,
  },
};
</script>

<style lang="less" scoped>
.card {
  min-height: 200px;
  margin: 0 0 20px 10px;
  display: flex;
  flex-direction: column;
  .card-type {
    position: relative;
    background: #fff;
    height: 80px;
    border: 1px solid transparent;
    margin: 15px 0 0 25px;
    line-height: 80px;
  }

  
}
</style>