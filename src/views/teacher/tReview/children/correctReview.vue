<template>
  <div class="correctReview">
    <div class="back" @click="back">
      <i class="el-icon-back"></i>
      <span class="back-content">返回学生列表</span>
    </div>
    <div class="review-page">
      <div class="review-title">
        <span>试卷标题</span>
      </div>
      <div class="review-info">
        <span>姓名</span>
        <span>学院</span>
        <span>专业</span>
        <span>班级</span>
      </div>
      <div class="review-content">
        <div class="content-left"></div>
        <div class="content-right"></div>
      </div>
    </div>
    <div class="review-foot">123</div>
  </div>
</template>

<script>
export default {
  name: "correctReview",
  data() {
    return {};
  },
  created() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.correctReview {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
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
      .content-left {
        width: 70%;
        background-color: #fff;
      }
      .content-right {
        flex: 1;
        background-color: #fff;
        margin-left: 20px;
        height: 400px;
      }
    }
  }
  .review-foot {
      height: 50px;
      background-color: #4498ee;
    }
}
</style>