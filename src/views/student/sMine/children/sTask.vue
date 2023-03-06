<template>
  <div class="task">
    <el-backtop :bottom="100">
      <div>UP</div>
    </el-backtop>
    <div class="task-wrapper">
      <div class="back" @click="back">
        <i class="el-icon-back"></i>
        <span class="back-content">返回学生列表</span>
      </div>
      <div class="left wrap-v6" ref="leftRef">
        <sTaskCard
          v-for="(item, index) in 10"
          :key="item"
          :index="index"
          ref="modal"
        ></sTaskCard>
      </div>

      <div class="right wrap-v7" ref="rightRef">
        <div class="title">选择题</div>
        <div class="option-index">
          <sTaskRecord
            class="index"
            v-for="(item, index) in 10"
            :key="item"
            @click.native="handlerClick(index)"
          >
            {{ index + 1 }}</sTaskRecord
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/common/TopBar.vue'
import { getQuestionList } from '@/services'
import { searchPage } from '@/services'
import { toSelect } from '@/utils/transfrom'
import sTaskCard from '@/components/student/sMine/sTaskCard.vue'
import sTaskRecord from '@/components/student/sMine/sTaskRecord.vue'
import { time } from 'echarts'
export default {
  name: 'sTask',
  components: { TopBar },
  data() {
    return {
      examID: '1595616208487460864',
      toSelect,
      radio: 'A',
      distance: 0,
      timer: null
    }
  },
  created() {
    this.getPageInfo()
  },
  methods: {
    goback() {
      this.$router.push('/student/mine')
    },
    back() {
      this.$router.go(-1)
    },
    async getPageInfo() {},

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
    }
  }
}
</style>
