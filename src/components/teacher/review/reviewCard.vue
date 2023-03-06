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
    console.log('card-执行')
    this.currentView = this.typeComponent[this.problem.type - 1]
    if (this.status === 1) {
      if ([1, 2, 3].includes(this.problem.type)) {
        this.setStatus({
          question_id: this.problem.question_id,
          value: true
        })
        this.scoreDisabled = this.currentProblemStatus.get(
          this.problem.question_id
        )
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
      this.input = this.param.get(this.problem.question_id)
    } else if (this.status !== 1) {
      if ([1, 2, 3].includes(this.problem.type)) {
        this.scoreDisabled = this.currentProblemStatus.get(
          this.problem.question_id
        )
      }
      this.changeTotalScore(this.TotalScore())
      this.changeTotalObjectiveScore(this.TotalObjectiveScore())
      // this.input = this.pageScore.filter((item) => {
      //   return item[0] === this.problem.question_id
      // })[0][1]
      this.input = this.currentPageScore.get(this.problem.question_id)
    }

    this.$watch('input', this.handler)
  },
  mounted() {},
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
    ...mapMutations('tReview', [
      'setScore', // 更改题目批改分数
      'changeCurrentProblem', // 更改当前正在批阅的题目
      'setObjectiveScore', // 更改客观题批改分数
      'changeTotalScore', // 改变总分
      'changeTotalObjectiveScore', // 改变客观题总分
      'setStatus' // 更改题目批改状态
    ]),
    handler(newVal, oldVal) {
      if (newVal.trim() !== '') {
        this.setScore({
          question_id: this.problem.question_id,
          value: newVal
        })
        this.setStatus({
          question_id: this.problem.question_id,
          value: true
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
    ...mapState('tReview', ['currentPageScore', 'currentProblemStatus']),
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