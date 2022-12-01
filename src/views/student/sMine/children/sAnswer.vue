<template>
  <div class="answer">
    <TopBar @left-click="goback">
      作业详情
    </TopBar>
    <div class="answer-wrapper">
      <div class="left wrap-v6" ref="leftRef">
        <template v-for="item in 100">
          <div>
            {{ item }}
          </div>
        </template>
      </div>
      <div class="right wrap-v7" ref="rightRef">
        <div class="title">选择题</div>
        <div class="index">1</div>
      </div>
    </div>
  </div>
</template>

<script >
import TopBar from '@/components/common/TopBar.vue';

export default {
  name: "sAnswer",
  components: { TopBar },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll, true)
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
    }

    .right {
      position: fixed;
      padding: 10px;
      background-color: #fff;
      height: fit-content;
      border-radius: 5px;
      top: 50px;
      margin-left: 920px;
    }
  }
}
</style>