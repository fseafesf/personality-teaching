<template>
  <div class="correctClass">
    <div class="back" @click="back">
      <i class="el-icon-back"></i>
      <span class="back-content">返回评阅列表</span>
    </div>
    <div class="classList">
      <div
        class="class"
        v-for="(item, index) in classes"
        :key="index"
        @click="handleClick(item.id)"
      >
        <div class="class-title">
          <span>{{ item.college }}</span>
          <span>/</span>
          <span>{{ item.major }}</span>
        </div>
        <div class="class-content">
          <span>{{ item.name }}</span>
        </div>
        <div class="class-foot">
          <span>未批改数量:</span>
          <span>{{ item.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getReviewClasses } from "@/services";
import { mapActions, mapState } from "vuex";
export default {
  name: "correctPaper",
  data() {
    return {
      pageId: String,
      classes: [],
    };
  },
  created() {
    this.pageId = this.$route.query.exam_id;
    // this.getClass();
    this.classes = this.reviewClasses;
  },
  methods: {
    ...mapActions("tReview", ["getInitReviewClasses"]),
    back() {
      this.$router.go(-1);
    },
    async getClass() {
      let data = {
        exam_id: this.pageId,
      };
      await getReviewClasses(data).then((res) => {
        console.log(res);
      });
    },
    handleClick(class_id) {
      console.log(class_id);
      this.$router.push({
        path: "/teacher/reviewHome/correctStudent",
        query: {
          exam_id: this.pageId,
          class_id: class_id,
        },
      });
    },
  },
  computed: {
    ...mapState("tReview", ["reviewClasses"]),
  },
};
</script>

<style lang="less" scoped>
.correctClass {
  min-height: 600px;
  padding-bottom: 30px;
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
  .classList {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: 20px;
    row-gap: 30px;
    justify-items: center;
    .class {
      width: 300px;
      height: 200px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      transition: 0.5s;

      &:hover {
        background: #409eff;
        color: white;
        cursor: pointer;
      }
      .class-title {
        height: 40px;
        border-bottom: 1px solid #f5f5f5;
        padding: 0 20px;
        line-height: 40px;

        span:not(:first-child) {
          margin-left: 10px;
        }
        span {
          font-size: 12px;
        }
      }
      .class-content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
      }
      .class-foot {
        height: 30px;
        border-top: 1px solid #f5f5f5;
        padding: 0 20px;
        line-height: 30px;
        font-size: 12px;
      }
    }
  }
}
</style>