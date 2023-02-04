<template>
  <div class="task">
    <TopBar @left-click="goback"> 作业 </TopBar>
    <div class="task-wrapper">
      <div class="left wrap-v6" ref="leftRef">
        <template v-for="(item, index) in 10">
          <div>
            <span>{{ index + 1 }}、</span>
            <span>题目内容</span>
          </div>
          <div class="option">
            <el-radio-group v-model="radio" size="small">
              <!-- size为small -->
              <div class="option-label" v-for="(item, index) in 4">
                <el-radio-button
                  style="border-radius: 50% !important"
                  :label="toSelect(index)"
                />
                <div class="option-content">{{ item }}</div>
              </div>
            </el-radio-group>
          </div>
        </template>
      </div>

      <div class="right wrap-v7" ref="rightRef">
        <div class="title">选择题</div>
        <div class="option-index">
          <div class="index" v-for="(item, index) in 10">{{ index + 1 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/common/TopBar.vue'
import { getQuestionList } from '@/services'
import { toSelect } from '@/utils/transfrom'

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
  }
  // destroyed() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // }
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

  .task-wrapper {
    margin-top: 50px;
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
