<template>
  <div class="preview">
    <div class="preview-head">
      <div class="head-left">
        <span class="left-lab">试卷结构:</span>
        <span class="left-test">课后作业</span>
        <span class="left-test">课堂测验</span>
        <span class="left-test">|</span>
        <div class="left-save">
          <span class="left-test">保存试卷</span>
        </div>
      </div>
      <div class="head-right">
        <el-button type="primary">保存试卷</el-button>
        <el-button type="primary" plain>下载试题</el-button>
      </div>
    </div>
    <div class="preview-content">
      <div class="preview-list wrap-v4">
        <div class="preview-title">
          <EditTitle
            :editTitle="this.pageTitle"
            @emitTitle="this.setTitle"
          ></EditTitle>
        </div>
        <Card
          v-for="(item, index) in problemsList"
          :key="index"
          :typeProblem="item"
          :index="index"
        ></Card>
      </div>
      <div class="preview-menu wrap-v5">
        <div class="preview-operation">
          <div class="operation-content">
            <div class="operation-continue ounifed" @click="back">
              <i class="el-icon-circle-plus-outline"></i>
              <span>继续选题</span>
            </div>
            <div class="operation-continue ounifed" @click="back">
              <i class="el-icon-menu"></i>
              <span>保存草稿</span>
            </div>
          </div>
        </div>
        <div class="preview-score">
          <div class="score-head"></div>
          <vuedraggable class="wrapper" v-model="problemsList">
            <transition-group>
              <Score
                v-for="(item, index) in this.problemsList"
                :key="index"
                :typeProblem="item"
                :index="index"
              ></Score>
            </transition-group>
          </vuedraggable>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Card from "components/teacher/Test/tPreview/tCard.vue";
import EditTitle from "components/teacher/Test/tPreview/tEditTitle.vue";
import Score from "components/teacher/Test/tPreview/tScore.vue";
import { group } from "utils/groupByType";
import { mapState } from "vuex";
import vuedraggable from "vuedraggable";

export default {
  name: "preview",
  data() {
    return {
      pageTitle: "请输入标题",
      pageId: Number,
      problemsList: [],
    };
  },
  created() {
    this.getProblems();
    console.log(this.problemsList);
    this.pageId = this.$route.query.id;
    if (!!this.pageId) {
      console.log("编辑的卷子");
    }
  },
  methods: {
    getProblems() {
      this.problemsList = group(this.page.selectProblem);
    },
    back() {
      if (!this.pageId) {
        this.$router.go(-1);
      }
      this.$router.push({
        path: "/teacher/examHome/test",
        id: this.pageId,
      });
      // this.$store.state.tTest.selectProblem = []
    },
    setTitle(title) {
      console.log(title);
      this.pageTitle = title;
    },
  },
  computed: {
    ...mapState("tTest", ["page"]),
  },
  components: {
    Card,
    EditTitle,
    Score,
    vuedraggable,
  },
};
</script>
  
  <style lang="less" scoped>
.preview {
  margin-top: 50px;
  .preview-head {
    height: 56px;
    background: #fff;
    display: flex;
    .head-left {
      flex-grow: 13;
      padding: 16px 0 0 20px;
      display: flex;
      .left-lab {
        color: #999;
        font-size: 12px;
        margin-right: 10px;
      }
      .left-test {
        font-size: 14px;
        font-weight: 300;
        margin-right: 15px;
        cursor: pointer;
      }
      .left-save {
        flex-grow: 2;
      }
    }
    .head-right {
      flex-grow: 1;
      padding: 10px 0 0 20px;
    }
  }
  .preview-content {
    display: flex;

    .preview-list {
      background: #fff;
      margin-top: 20px;
      .preview-title {
        display: flex;
        justify-content: center;
        height: 50px;
        line-height: 50px;
        width: 200px;
        margin-left: 40%;
      }
    }
    .preview-menu {
      margin: 15px 0 0 30px;

      .preview-operation {
        background: #fff;
        height: 80px;
        margin-top: 5px;
        .operation-content {
          padding: 20px 5px 0 15px;
          cursor: pointer;
          color: #5198e0;
          font-size: 14px;
          display: flex;
          flex-wrap: wrap;
          .ounifed {
            width: 110px;
            span{
              margin-left: 5px;
            }
          }
        }
      }
      .preview-score {
        min-height: 200px;
        background: #fff;
        margin-top: 15px;
        .score-head{
          height: 32px;
          padding: 10px 0;
        }
      }
    }
  }
}
</style>