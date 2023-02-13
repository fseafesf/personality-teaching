<template>
  <div class="correctReview">
    <el-backtop :bottom="100">
      <div>UP</div>
    </el-backtop>
    <div class="back" @click="back">
      <i class="el-icon-back"></i>
      <span class="back-content">返回学生列表</span>
    </div>
    <div class="review-page">
      <div class="review-title">
        <span>{{ exam_name || '' }}</span>
      </div>
      <div class="review-info">
        <span>姓名</span>
        <span>学院</span>
        <span>专业</span>
        <span>班级</span>
      </div>
      <div class="review-content">
        <div class="content-left">
          <template v-if="startRendering">
            <ReviewCard
              ref="modal"
              v-for="(item, index) in problemList"
              :key="item.question_id"
              :index="index"
              :problem="item"
              :status="status"
              
            >
            </ReviewCard>
          </template>
        </div>
        <div class="content-right">
          <div class="title"><span> 题目列表 </span></div>
          <div class="record">
           <template v-if="startRendering">
            <ReviewRecord
              v-for="(item, index) in problemList"
              :key="item.question_id"
              :index="index"
              :problem="item"
              :status="status"
              @click.native="handlerClick(index)"
            ></ReviewRecord>
           </template>
          </div>
        </div>
      </div>
    </div>
    <div class="review-foot">
      <div class="total">
        <span>客观题总分:{{ this.totalObjectiveScore }}</span>
        <span>总分:{{ this.totalScore }}</span>
      </div>
      <div class="operate">
        <el-button size="mini" @click="complete">完成批阅</el-button>
        <el-button size="mini" :disabled="disabled" @click="nextPage"
          >下一份</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { searchPage, getStudentsAnswer, updateReview } from '@/services'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { group, breakGroup } from 'utils/groupByType'
import ReviewCard from '@/components/teacher/review/reviewCard.vue'
import ReviewRecord from '@/components/teacher/review/reviewRecord.vue'
import _ from 'lodash'
export default {
  name: 'correctReview',
  data() {
    return {
      examId: String,
      classId: String,
      studentId: String,
      status: Number,
      problemList: [],
      distance: 0,
      disabled: false,

      exam_name: '',
      answers: '',
      times: '',

      startRendering: false,
    }
  },
  created() {
    this.examId = this.$route.query.exam_id
    this.classId = this.$route.query.class_id
    this.studentId = this.$route.query.student_id
    this.status = +this.$route.query.status
    this.getInitStudents({
      exam_id: this.examId,
      class_id: this.classId
    })

    // 未批改 的 直接全部初始为0分
    if (this.status == 1) {
      this.init(false)
    } else if (this.status !== 1) {
      console.log('批改过')
      this.init(true)
    }
  },
  methods: {
    ...mapMutations('tReview', [
      'initScore', // 初始未批改试卷的分数
      'initStatus', // 初始未批改试卷的状态
      'initCorrectedScore', // 初始批改过的试卷的分数
      'initCorrectedStatus', // 初始批改过的试卷的状态
      'clearTotalScore'
    ]),
    ...mapActions('tReview', ['getInitStudents']),
    back() {
      this.$router.go(-1)
      this.clearTotalScore()
    },
    init(choose) {
      this.getPageInfo({ corrected: choose }).then(() => {
        this.getStudentScore({ corrected: choose }).then(() => {
          this.startRendering = true
        })
      })
    },
    async getPageInfo(param) {
      await searchPage(this.$cookies.get('session_key'), this.examId).then(
        (res) => {
          console.log(res)
          this.exam_name = res.data.exam_name
          this.problemList = breakGroup(JSON.parse(res.data.questions))
          if (!param.correctd) {
            // 未批改过则进行题目初始
            this.initScore(this.problemList)
            this.initStatus(this.problemList)
          }
        }
      )
    },
    async getStudentScore(param) {
      await getStudentsAnswer({
        exam_id: this.examId,
        student_id: this.studentId
      }).then((res) => {
        console.log(res)
        this.answers = res.data.answers
        this.times = res.data.times
        if (param.corrected) {
          // 批改过 则用保存到的数据进行初始化
          console.log('corrected')
          this.initCorrectedScore(JSON.parse(res.data.detailed_score))
          this.initCorrectedStatus(JSON.parse(res.data.problem_status))
        }
      })
    },
    handlerClick(index) {
      for (let i = 0; i < index; i++) {
        this.distance += this.$refs.modal[i].$el.offsetHeight
      }
      document.documentElement.scrollTop = this.distance + 310
      this.distance = 0
    },

    complete() {
      let status = 0
      for (let param of [...this.currentProblemStatus.entries()]) {
        if (!param[1]) {
          status = 2
        }
      }
      console.log(status)
      let data = {
        exam_id: this.examId,
        student_id: this.studentId,
        answers: this.answers,
        detailed_score: JSON.stringify([...this.currentPageScore.entries()]),
        total_score: this.totalScore + '',
        status: status,
        problem_status: JSON.stringify([
          ...this.currentProblemStatus.entries()
        ]),
        times: this.times
      }
      // console.log(data)
      updateReview(data).then((res) => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '评阅成功'
          })
        }
        console.log(res)
      })
    },

    nextPage() {
      let index = this.reviewStudents.findIndex((item) => {
        console.log(this.studentId, item.student_id)
        return item.student_id === this.studentId
      })
      console.log(index)
      if (index === this.reviewStudents.length - 1) {
        this.disabled = true
        this.$message({
          type: 'warning',
          message: '当前已经是最后一份'
        })
        return
      }
      this.$router.replace({
        path: '/teacher/reviewHome/correctReview',
        query: {
          exam_id: this.examId,
          class_id: this.classId,
          student_id: this.reviewStudents[index + 1].student_id,
          status: this.reviewStudents[index + 1].status
        }
      })
      console.log(index)
      console.log(this.reviewStudents[index + 1])
    }
  },
  computed: {
    ...mapState('tReview', [
      'currentPageScore', // 当前试卷每道题分数
      'currentProblem',
      'totalScore', // 总分
      'totalObjectiveScore', // 客观题总分
      'reviewStudents',
      'currentProblemStatus'
    ]),
    ...mapGetters('tReview', ['TotalScore', 'TotalObjectiveScore'])
  },
  components: {
    ReviewCard,
    ReviewRecord
  },
  watch: {
    $route(to, from) {
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.correctReview {
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px);
  .back {
    display: flex;
    align-items: center;
    width: 20%;
    height: 50px;
    margin: 10px 0 10px 0;
    cursor: pointer;
    .back-content {
      margin-left: 10px;
    }
  }
  .review-page {
    min-height: 600px;
    margin-top: 20px;
    height: 100%;
    padding-bottom: 30px;

    .review-title {
      height: 60px;
      display: flex;
      justify-content: center;
      line-height: 60px;
      background-color: #4498ee;
    }
    .review-info {
      height: 50px;
      display: flex;
      justify-content: space-around;
      line-height: 50px;
      background: #fff;
    }
    .review-content {
      min-height: 800px;
      display: flex;
      width: 90%;
      margin: 40px auto 10px;
      overflow: scroll;
      .content-left {
        width: 70%;
        background-color: #fff;
      }
      .content-right {
        flex: 1;
        background-color: #fff;
        margin-left: 20px;
        max-height: 600px;
        .title {
          height: 0;
          border: 1px dashed gray;
          margin: 20px 15px;
          opacity: 0.5;
          position: relative;
          span {
            position: absolute;
            left: 40%;
            top: -10px;
          }
        }
        .record {
          margin: auto;
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
  }
  .review-foot {
    height: 50px;
    background-color: #4498ee;
    display: flex;
    align-items: baseline;
    .total {
      height: 50px;
      flex: 1;
      display: flex;
      padding-left: 120px;
      span {
        margin: 20px 40px 10px;
      }
    }
    .operate {
      height: 50px;
      flex: 1.5;
      display: flex;
      align-items: center;

      button {
        margin: 0 20px;
      }
    }
  }
}
</style>