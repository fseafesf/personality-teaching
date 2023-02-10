<template>
  <div class="review-card">
    <div :is="currentView" :typeProblem="problem" :index="index"></div>
    <div class="problem-answer">
      <span>该题答案:</span>
    </div>
    <div class="student-answer">
      <span>学生答案:</span>
    </div>
    <div class="review-operate">
      <div class="review-score">
        <div>
          <span>该题分值:</span>
        </div>
        <div class="mark">
          <span>评分:</span>
          <el-input
            :disabled="scoreDisabled"
            v-model="input"
            placeholder="评分"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
export default {
  name: 'reviewCard',
  data() {
    return {
      currentView: '',
      typeArr: ['单选', '多选', '判断', '填空', '简答'],
      typeComponent: ['Radio', 'Multi', 'Judge', 'Fill', 'Answer'],
      scoreDisabled: false,
      input: ''
    }
  },
  beforeCreate() {},
  created() {
    console.log('card-执行', this.status, this.param)
    this.currentView = this.typeComponent[this.problem.type - 1]
    if (this.status !== '1') {
      this.changeTotalScore(this.TotalScore())
      this.changeTotalObjectiveScore(this.TotalObjectiveScore())
      this.input = this.pageScore.filter((item) => {
        return item[0] === this.problem.question_id
      })[0][1]
    }
    if ([1, 2, 3].includes(this.problem.type)) {
      this.scoreDisabled = true
      /* 
      if(题目答案和学生答案一样){
        this.input === this.problem.score
         this.setScore({
          question_id: this.problem.question_id,
          value: 题目分数,
        });
      }
      else{
        this.setScore({
          question_id: this.problem.question_id,
          value: 0,
        });
      }

      */
      this.setObjectiveScore({
        question_id: this.problem.question_id,
        value: this.currentPageScore.get(this.problem.question_id)
      })
    }

    if (this.status === 1) {
      this.input = this.param.get(this.problem.question_id)
    }

    this.$watch('input', this.handler)
  },
  mounted() {
    console.log('mounted')
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
      type: String
    },
    pageScore: {
      type: Array
    }
  },
  methods: {
    ...mapMutations('tReview', [
      'setScore',
      'changeCurrentProblem',
      'setObjectiveScore',
      'changeTotalScore',
      'changeTotalObjectiveScore'
    ]),
    handler(newVal, oldVal) {
      if (newVal.trim() !== '') {
        this.setScore({
          question_id: this.problem.question_id,
          value: newVal
        })

        this.changeTotalScore(this.TotalScore())
        this.changeTotalObjectiveScore(this.TotalObjectiveScore())
        console.log(this.TotalScore())
        this.changeCurrentProblem(this.problem.question_id)
      }
    }
  },
  components: {
    Radio: () => import('@/components/teacher/Test/tQuestion/tRadio.vue'),
    Multi: () => import('@/components/teacher/Test/tQuestion/tMulti.vue'),
    Judge: () => import('@/components/teacher/Test/tQuestion/tJudge.vue'),
    Fill: () => import('@/components/teacher/Test/tQuestion/tFill.vue'),
    Answer: () => import('@/components/teacher/Test/tQuestion/tAnswer.vue')
  },
  computed: {
    ...mapState('tReview', ['currentPageScore']),
    ...mapGetters('tReview', ['TotalScore', 'TotalObjectiveScore']),
    param() {
      return this.currentPageScore
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.review-card {
  padding: 30px 0 0 0;
  .student-answer,
  .problem-answer {
    margin: 30px 20px;
  }
  .review-operate {
    min-height: 100px;
    padding: 20px;

    .review-score {
      min-height: 100px;
      width: 30%;
      .mark {
        display: flex;
        align-items: center;
        margin-top: 20px;
        span {
          width: 50px;
        }
      }
    }
  }
}
</style>