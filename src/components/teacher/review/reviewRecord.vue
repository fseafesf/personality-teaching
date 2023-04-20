<template>
  <!-- 题目列表 -->
  <div class="review-record" :class="[{ complete: completeCorrect }]">
    <span>{{ this.index + 1 }}</span>
  </div>
</template>

<script>
import { watch } from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'reviewRecord',
  data() {
    return {
      completeCorrect: false
    }
  },
  created() {
    if (this.status == 1) {
      if ([1, 2, 3].includes(this.problem.type)) {
        this.completeCorrect = true
      }
    } else if (this.status !== 1) {
      this.completeCorrect = this.currentProblemStatus.get(
        this.problem.question_id
      )
    }
  },
  props: {
    problem: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number
    },
    status: {
      type: Number
    }
  },
  methods: {
    ...mapMutations('tReview', ['setScore', 'setStatus'])
  },
  computed: {
    ...mapState('tReview', [
      'currentPageScore',
      'currentProblem',
      'currentProblemStatus'
    ])
  },
  watch: {
    currentProblem: {
      handler(newVal, oldVal) {
        console.log(newVal)
        if (newVal === this.problem.question_id) {
          this.completeCorrect = true
          this.setStatus({
            question_id: this.problem.question_id,
            value: true
          })
        }
      }
      //   deep: true,
      //   immediate:true
    }
  }
}
</script>

<style lang="less" scoped>
.review-record {
  cursor: pointer;
  width: 45px;
  height: 40px;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 5px;
  border-radius: 5px;
  transition: all .3s;
  &:hover{
    border: 2px solid #4498ee;
  }
}
.complete {
  color: #fff !important;
  background: #4498ee !important;
  background-color: rgb(68, 152, 238);
}
</style>