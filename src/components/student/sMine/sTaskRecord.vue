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
      default: () => ({
      })
    }
  },
  methods: {
    ...mapMutations('sTask', ['setAnswersFinished'])
  },
  computed: {
    ...mapState('sTask', ['currentProblem'])
  },

  watch: {
    currentProblem: {
      handler(newVal, oldVal) {
        if (newVal === this.problem.question_id) {
          this.finished = true
          this.setAnswersFinished({
            question_id: this.problem.question_id,
            value: true
          })
        }
      }
    }
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