<template>
  <div class="correctReview">
    <el-backtop :bottom="100">
      <div><i class="el-icon-top"></i></div>
    </el-backtop>
    <div class="back" @click="back">
      <i class="el-icon-back"></i>
      <span class="back-content">返回学生列表</span>
    </div>
    <div class="review-page">
      <div class="review-title">
        <h2><i class="el-icon-s-order"></i>{{ exam_name || '加载中...' }}</h2>
      </div>
      <div class="review-info">
        <span><i class="el-icon-user-solid"></i>姓名:</span>
        <span><i class="el-icon-s-home"></i>学院:</span>
        <span><i class="el-icon-s-management"></i>专业:</span>
        <span><i class="el-icon-s-data"></i>班级:</span>
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
          <div class="review-foot">
            <div class="total">
              <span>总分:{{ this.totalScore }}  </span>
              <span>客观题总分:{{ this.totalObjectiveScore }}</span>
            </div>

            <div class="operate">
              <el-button size="mini" @click="complete">完成批阅</el-button>
              <el-button size="mini" :disabled="disabled" @click="nextPage">下一份</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  searchPage,
  getStudentsAnswer,
  updateReview,
  searchStudentAPI
} from '@/services'
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
      timer: null
    }
  },

  created() {
    this.examId = this.$route.query.exam_id
    this.classId = this.$route.query.class_id
    this.studentId = this.$route.query.student_id
    this.status = Number(this.$route.query.status) //?????+

    // console.log(this.status,this.studentId,this.classId,this.examId,this.times)

    this.getInitStudents({
      exam_id: this.examId,
      class_id: this.classId
    })

    //获取学生信息 接口暂未写好
    searchStudentAPI(this.studentId).then((res) => {
      // console.log(res)
    })

    this.init(false)


    // 未批改 的 直接全部初始为0分  -1未提交 0已批改完成 1未批改 2未批改完
    //   if (this.status == 1) {
    //     this.init(false)
    //   } else if (this.status !== 1) {
    //     console.log('批改过')
    //     this.init(true)
    //   }
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

    init(choose) {
      this.getPageInfo({ corrected: choose }).then(() => {
        this.getStudentScore({ corrected: choose }).then(() => {
          this.startRendering = true
        })
      })
    },

    //获取试卷信息
    async getPageInfo(param) {
      console.log(param);
      await searchPage(this.examId).then(
        (res) => {
          // console.log(res) 
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
        console.log(res.data.answers)
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

    complete() {
      let status = 0
      let count = 0
      for (let param of [...this.currentProblemStatus.entries()]) {
        if (!param[1]) {
          status = 2
          count++
        }
      }
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
      if (count !== 0) {
        this.$confirm(`当前还有${count}道题目没有批阅`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.confirmComplete(data)
          })
          .catch(() => {})
      } else {
        this.confirmComplete(data)
      }
    },

    confirmComplete(data) {
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
    },

    //返回上级
    back() {
      this.$router.go(-1)
      this.clearTotalScore()
    },
    //题目列表移动
    move(target, element, attribute, time) {
      let temp = 0
      this.timer = setInterval(() => {
        let speed = (target - element[attribute]) / 5
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
        temp += speed
        element[attribute] += speed
        let finished = temp >= target
        if (speed === 0 || finished) {
          clearInterval(this.timer)

          this.distance = 0
        }
      }, time)
    },
    //处理题目列表移动
    handlerClick(index) {
      if (!!this.timer) {
        //强制转化为布尔值
        clearInterval(this.timer)
      }
      for (let i = 0; i < index; i++) {
        this.distance += this.$refs.modal[i].$el.offsetHeight
      }
      this.distance += 310
      this.move(this.distance, document.documentElement, 'scrollTop', 10)
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
    width: 15%;
    height: 50px;
    margin: 10px 0 10px 0;
    cursor: pointer;
    .back-content {
      margin-left: 10px;
    }
  }
  .review-page {
    min-height: 600px;
    height: 100%;
    padding-bottom: 30px;

    .review-title {
      height: 60px;
      display: flex;
      justify-content: center;
      line-height: 60px;
      box-sizing: border-box;
      background-color: white;
      border: 3px solid #4498ee;
      border-radius: 5px;
      letter-spacing: 5px;
    }
    .review-info {
      margin-top: 10px;
      height: 50px;
      display: flex;
      justify-content: space-around;
      line-height: 50px;
      background: #fff;
      border-radius: 5px;
    }
    .review-content {
      height: 800px;
      display: flex;
      width: 100%;
      margin: 30px auto 0px;
      .content-left {
        width: 70%;
        max-height: 800px;
        height: 2000px;
        overflow: scroll;
        background-color: #fff;
      }
      .content-right {
        flex: 1;
        background-color: #fff;
        margin-left: 20px;
        // max-height: 600px;
        .title {
          height: 0;
          margin: 30px 15px;
          opacity: 0.7;
          position: relative;
          span {
            position: absolute;
            left: 40%;
            top: -10px;
          }
        }
        .record {
          width: 250px;
          margin: 60px auto;
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
  }
  .review-foot {
    width: 280px;
    height: 260px;
    margin: 160px auto;
    border-radius: 5px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    transition: all .3s;
    &:hover{
      border: 2px solid #4498ee;
    }
    .total {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      text-align: center;
      span {
        width: 100%;
        margin: 25px;
        font-size: 24px;
        letter-spacing: 2px;
      }
    }
    .operate {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        // margin: 0 20px;
        width: 100px;
        height: 40px;
      }
    }
  }
}
</style>