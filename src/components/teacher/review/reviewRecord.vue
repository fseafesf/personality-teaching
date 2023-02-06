<template>
  <div class="review-record" :class="[{ complete: completeCorrect }]">
    <span>{{ this.index + 1 }}</span>
  </div>
</template>

<script>
import { watch } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "reviewRecord",
  data() {
    return {
      completeCorrect: false,
    };
  },
  created() {
    if ([1, 2, 3].includes(this.problem.type)) {
      this.completeCorrect = true;
    }
  },
  props: {
    problem: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
    },
  },
  methods: {
    ...mapMutations("tReview", ["setScore"]),
  },
  computed: {
    ...mapState("tReview", ["currentPageScore", "currentProblem"]),
    params() {
      return Array.from(this.currentPageScore);
    },
  },
  watch: {
    currentProblem: {
      handler(newVal, oldVal) {
        console.log(newVal)
        if (newVal === this.problem.question_id) {
          this.completeCorrect = true;
        }
      },
      //   deep: true,
    //   immediate:true
    },
  },
};
</script>

<style lang="less" scoped>
.review-record {
  width: 45px;
  height: 40px;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 5px;
  border-radius: 5px;
}
.complete {
  color: #fff !important;
  background: #4498ee !important;
  background-color: rgb(68, 152, 238);
}
</style>