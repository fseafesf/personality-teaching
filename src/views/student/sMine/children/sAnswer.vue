<template>
  <div class="answer">
    <TopBar @left-click="goback">
      作业详情
    </TopBar>
    <div class="answer-wrapper">
      <div class="left wrap-v6" ref="leftRef">
        <div v-for="(item, index) in 10" :key="item">
          <div>
            <span>{{ index + 1 }}、</span>
            <span>题目内容</span>
          </div>
          <div class="option">
            <div class="option-item" v-for="(item, index) in 4" :key="item">
              <span class="option-label">{{ toSelect(index) }}</span>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="right wrap-v7" ref="rightRef">
        <div class="title">选择题</div>
        <div class="option-index">
          <div class="index" v-for="(item, index) in 10" :key="item">{{ index + 1 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import TopBar from '@/components/common/TopBar.vue';
import { getQuestionList } from '@/services';
import { toSelect } from '@/utils/transfrom';

export default {
  name: "sTask",
  components: { TopBar },
  data() {
    return {
      toSelect
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
      this.$router.push("/student/class");
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
  // }
}
</script>

<style lang="less" scoped>
.answer {
  display: flex;

  .answer-wrapper {
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

        .option-item {

          .option-label {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            margin: 0 10px 8px 0;
            background-color: var(--primary-color);
            color: #fff;
            padding: 2px;
            border-radius: 50%;
          }

          &:hover {
            background-color: #F7FAFC;
            cursor: pointer;
          }
        }
      }
    }

    .right {
      position: fixed;
      padding: 10px;
      background-color: #fff;
      height: fit-content;
      border-radius: 5px;
      top: 50px;
      margin-left: 920px;
      box-sizing: border-box;

      .title {
        margin-bottom: 10px;
      }

      .option-index {
        display: flex;
        flex-wrap: wrap;
        margin-left: 10px;
        gap: 20px;

        .index {
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border: 2px solid var(--primary-color);
          border-radius: 50%;
          padding: 4px;

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