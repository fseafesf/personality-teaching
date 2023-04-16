<template>
  <div class="task">
    <el-backtop :bottom="100">
      <div>UP</div>
    </el-backtop>
    <div class="task-wrapper">
      <div class="back" @click="back">
        <i class="el-icon-back"></i>
        <span class="back-content">返回主页</span>
      </div>
      <div class="left wrap-v6" ref="leftRef">
        <sTaskCard
          v-for="(item, index) in this.questions"
          :problem="item"
          :key="item.question_id"
          :index="index"
          ref="modal"
        ></sTaskCard>
      </div>

      <div class="right wrap-v7" ref="rightRef">
        <div class="title">题目列表</div>
        <div class="option-index">
          <sTaskRecord
            class="index"
            v-for="(item, index) in this.questions"
            :problem="item"
            :key="item.question_id"
            @click.native="handlerClick(index)"
          >
            {{ index + 1 }}</sTaskRecord
          >
        </div>
        <div class="operate" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/common/TopBar.vue'
import sTaskCard from '@/components/student/sMine/sTaskCard.vue'
import sTaskRecord from '@/components/student/sMine/sTaskRecord.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import { uploadAnswer } from '@/services'
import { breakGroup } from '@/utils/groupByType'
import { toSelect } from '@/utils/transfrom'
import { getCache } from '@/utils/localstorage'
export default {
  name: 'sTask',
  components: { TopBar },
  data() {
    return {
      studentID: '',
      examID: String,
      questions: [],
      toSelect,
      radio: 'A',
      distance: 0,

      // 定时器
      timer: null
    }
  },
  created() {
    this.studentID = getCache('studentId')
    this.examID = this.$route.query.exam_id
    this.getPageInfo().then(() => {
      this.questions = breakGroup(
        JSON.parse(this.examList[this.examID].questions)
      )
    })
  },
  methods: {
    ...mapActions('sTask', ['getInitExamList']),
    goback() {
      this.$router.push('/student/mine')
    },
    back() {
      this.$router.go(-1)
    },
    async getPageInfo() {
      await this.getInitExamList(this.studentID)
    },

    handlerClick(index) {
      if (!!this.timer) {
        clearInterval(this.timer)
      }
      for (let i = 0; i < index; i++) {
        this.distance += this.$refs.modal[i].$el.offsetHeight + 35
      }
      this.distance += 150
      this.move(this.distance, document.documentElement, 'scrollTop', 10)
    },

    submit() {
      let count = 0
      for (let param of [...this.answersFinished.entries()]) {
        if (!param[1]) {
          count++
        }
      }
      let data = {
        exam_id: this.examID,
        student_id: this.studentID,
        answers: JSON.stringify([...this.studentAnswers.entries()])
      }

      if (count !== 0) {
        this.$message({
          type: 'warning',
          message: '作业未全部完成'
        })
      } else {
        uploadAnswer(data).then((res) => {
          if (res.msg == 'success') {
            this.$message({
              type: '提交成功',
              message: `${res.msg}`
            })
            this.$router.replace({
              path: '/student/mine'
            })
          }
          console.log(res)
        })
      }
      console.log(this.studentAnswers)
    },

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
    }
  },

  components: {
    sTaskCard,
    sTaskRecord
  },
  computed: {
    ...mapState('sTask', ['examList', 'studentAnswers', 'answersFinished'])
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-radio-group {
  font-size: 16px;
}

/deep/ .el-radio-button__inner {
  width: 0px !important;
  height: 32px !important;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task {
  display: flex;
  .back {
    display: flex;
    align-items: center;
    width: 20%;
    height: 50px;
    cursor: pointer;
    .back-content {
      margin-left: 10px;
    }
  }

  .task-wrapper {
    margin-top: 0px;
    position: relative;

    .left {
      background-color: #fff;
      min-height: 90vh;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 20px;

      .option {
        margin: 20px;

        .option-label {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;

          .option-content {
            margin-left: 10px;
          }
        }
      }
    }

    .right {
      position: fixed;
      box-sizing: border-box;
      padding: 20px;
      background-color: #fff;
      height: fit-content;
      border-radius: 5px;
      top: 50px;
      margin-left: 920px;
      margin-top: 50px;

      .title {
        margin-bottom: 10px;
      }

      .option-index {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;

        .index {
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border: 2px solid #efefef;
          padding: 8px;
          border-radius: 5px;

          &:hover {
            background-color: var(--primary-color);
            color: #fff;
            cursor: pointer;
          }
        }
      }
      .operate {
        height: 50px;
        margin-top: 30px;
      }
    }
  }
}
</style>
