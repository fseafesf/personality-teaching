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
          <ReviewCard
            ref="modal"
            v-for="(item, index) in problemList"
            :key="item.question_id"
            :index="index"
            :problem="item"
          >
          </ReviewCard>
        </div>
        <div class="content-right">
          <div class="title"><span> 题目列表 </span></div>
          <div class="record">
            <ReviewRecord
              v-for="(item, index) in problemList"
              :key="item.question_id"
              :index="index"
              :problem="item"
              @click.native="handlerClick(index)"
            ></ReviewRecord>
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
import { searchPage, getStudentsAnswer } from '@/services'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { group, breakGroup } from 'utils/groupByType'
import ReviewCard from '@/components/teacher/review/reviewCard.vue'
import ReviewRecord from '@/components/teacher/review/reviewRecord.vue'
import { watch } from 'vue'
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
      exam_name: ''
    }
  },
  created() {
    this.examId = this.$route.query.exam_id
    this.classId = this.$route.query.class_id
    this.studentId = this.$route.query.student_id
    this.status = this.$route.query.status
    this.getPageInfo()
    this.getInitStudents({
      exam_id: this.examId,
      class_id: this.classId
    })
    // 清空分数map

    if (this.status === 1) {
      this.initScore(this.problemList)
    } else {
      // 获取当前学生当前试卷的批阅情况
      console.log('批改过')
    }

    this.getStudentScore()
  },
  methods: {
    ...mapMutations('tReview', ['initScore']),
    ...mapActions('tReview', ['getInitStudents']),
    back() {
      this.$router.go(-1)
    },
    async getPageInfo() {
      await searchPage(this.$cookies.get('session_key'), this.examId).then(
        (res) => {
          console.log(res)
          this.exam_name = res.data.exam_name
          this.problemList = breakGroup(JSON.parse(res.data.questions))
          this.initScore(this.problemList)
        }
      )
    },
    async getStudentScore() {
      await getStudentsAnswer({
        exam_id: this.examId,
        student_id: this.studentId
      }).then((res) => {
        console.log(res)
      })
    },
    handlerClick(index) {
      for (let i = 0; i < index; i++) {
        this.distance += this.$refs.modal[i].$el.offsetHeight
      }
      document.documentElement.scrollTop = this.distance + 310
      // console.log(this.$refs.modal[0].$el.offsetHeight);
      this.distance = 0
    },

    complete() {},

    nextPage() {
      let index = this.reviewStudents.findIndex((item) => {
        console.log(this.studentId, item.student_id)
        return item.student_id === this.studentId
      })
      console.log(index)
      if (index === this.reviewStudents.length - 1) {
        this.disabled = true
        return
      }
      this.$router.replace({
        path: '/teacher/reviewHome/correctReview',
        query: {
          exam_id: this.examId,
          class_id: this.classId,
          student_id: this.reviewStudents[index + 1].student_id,
          status: this.status
        }
      })
      console.log(index)
      console.log(this.reviewStudents[index + 1])
    }
  },
  computed: {
    ...mapState('tReview', [
      'currentPageScore',
      'currentProblem',
      'totalScore',
      'totalObjectiveScore',
      'reviewStudents'
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