<template>
  <div class="task-record" :class="[{ finished: finished }]">
    <slot> </slot>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
export default {
  name: 'taskRecord',
  data() {
    return {
      finished: false
    }
  },
  props: {
    problem: {
      type: Object,
      default: () => ({})
    },
    status: {
      type: Number
    }
  },
  created() {
    if (this.status == 0) {
      this.finished = this.answersFinished.get(this.problem.question_id)
    }
  },
  methods: {
    ...mapMutations('sTask', ['setAnswersFinished'])
  },
  computed: {
    ...mapState('sTask', [
      'currentProblem',
      'studentAnswers',
      'answersFinished'
    ]),
    currentQuestion() {
      return () => this.currentProblem
    }
  },

  watch: {
    currentProblem: {
      handler(newVal, oldVal) {
        // console.log(newVal, newVal.length)
        if (newVal.slice(1) == this.problem.question_id) {
          if (this.problem.type == 4) {
            let answer = this.studentAnswers.get(newVal.slice(1))
            console.log(answer)
            let flag = true
            answer.forEach((element) => {
              if (element == '') {
                flag = false
              }
            })
            // console.log(flag)
            if (flag) {
              this.finished = true
              this.setAnswersFinished({
                question_id: this.problem.question_id,
                value: true
              })
            }
          }
        }
        if (newVal === this.problem.question_id) {
          this.finished = true
          this.setAnswersFinished({
            question_id: this.problem.question_id,
            value: true
          })
        }
      }
    }
    // currentQuestion: {
    //   handler(newVal, oldVal) {
    //     console.log(newVal)
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.finished {
  color: #fff !important;
  background: #4498ee !important;
  background-color: rgb(68, 152, 238);
}
</style>
