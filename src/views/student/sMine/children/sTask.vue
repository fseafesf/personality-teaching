<template>
  <div class="task">
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
        ></sTaskCard>
      </div>

      <div class="right wrap-v7" ref="rightRef">
        <div class="title">选择题</div>
        <div class="option-index">
          <div class="index" v-for="(item, index) in 10" :key="item">
            {{ index + 1 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/common/TopBar.vue'
import { getQuestionList } from '@/services'
import { toSelect } from '@/utils/transfrom'
import sTaskCard from '@/components/student/sMine/sTaskCard.vue'

export default {
  name: 'sTask',
  components: { TopBar },
  data() {
    return {
      toSelect,
      radio: 'A'
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll, true)
    // getQuestionList(1, 10).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    goback() {
      this.$router.push('/student/mine')
    },
    back() {
      this.$router.go(-1)
    }
    //   handleScroll() {
    //     let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //     let scrollTop = document.documentElement.scrollTop
    //     console.log('scrollTop', scrollTop)
    //     // this.$refs.rightRef.scrollTop = scrollTop
    //     console.log(this.$refs)
    //     console.log(this.$refs.rightRef.offsetTop)
    //     this.$refs.rightRef.style.top = scrollTop + 50 + 'px'
    //   }
  },
  // destroyed() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // },
  components: {
    sTaskCard
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
