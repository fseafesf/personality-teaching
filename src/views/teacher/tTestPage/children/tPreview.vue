<template>
  <div class="preview">
    <div class="back" @click="this.pBack">
      <i class="el-icon-back"></i>
      <span class="back-content">返回试卷列表</span>
    </div>
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
        <el-button type="primary" @click="save" v-if="!createD"
          >保存试卷</el-button
        >
        <el-button type="primary" plain>下载试题</el-button>
      </div>
    </div>
    <div class="preview-content">
      <div class="preview-list wrap-v4">
        <div class="preview-title">
          <EditTitle :editTitle.sync="pageTitle"></EditTitle>
        </div>
        <Card
          v-for="(item, index) in problemsList"
          :key="item.type"
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
            <div
              class="operation-continue ounifed"
              v-if="createD"
              @click="modify"
            >
              <i class="el-icon-menu"></i>
              <span>完成修改</span>
            </div>
          </div>
        </div>
        <div class="preview-score">
          <div class="score-head"></div>
          <vuedraggable class="wrapper" v-model="problemsList">
            <transition-group>
              <Score
                v-for="(item, index) in problemsList"
                :key="item.type"
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
import { group, breakGroup } from "utils/groupByType";
import { mapActions, mapMutations, mapState } from "vuex";
import vuedraggable from "vuedraggable";
import { createPage, searchPage, modifyPage } from "@/services";
import { setCache, getCache, clearCache } from "@/utils/localstorage";

export default {
  name: "preview",
  data() {
    return {
      pageTitle: "请输入标题",
      pageId: "",
      problemsList: [],
    };
  },
  created() {
    console.log(this.page.selectProblem);
    if (!!getCache("title")) {
      this.pageTitle = getCache("title");
    }
    this.pageId = this.$route.query.id;
    if (!!this.pageId) {
      searchPage(this.$cookies.get("session_key"), this.pageId).then((res) => {
        console.log(res);
        this.setPageData({
          key: "title",
          val: res.data.exam_name,
        });
        this.pageTitle = this.page.title;
        this.setPageData({
          key: "exam_id",
          val: this.pageId,
        });
        this.setPageData({
          key: "selectProblem",
          val: breakGroup(JSON.parse(res.data.questions)),
        });
        this.problemsList = JSON.parse(res.data.questions);
        setCache("exam_id", this.pageId);
        setCache("title", res.data.exam_name);
        setCache("selectProblem", breakGroup(JSON.parse(res.data.questions)));
      });
    } else {
      this.getProblems();
    }
  },
  methods: {
    ...mapMutations("tTest", ["setPageData", "clearPageData"]),
    ...mapActions("tTest", ["setTitle"]),
    getProblems() {
      this.problemsList = group(getCache("selectProblem"));
    },
    pBack() {
      this.clearPageData({
        key: "title",
        val: "",
      });
      this.clearPageData({
        key: "exam_id",
        val: "",
      });
      this.clearPageData({
        key: "selectProblem",
        val: [],
      });
      clearCache("exam_id");
      clearCache("title");
      clearCache("selectProblem");
      this.$router.replace({
        path: "/teacher/examHome",
      });
    },
    back() {
      this.$router
        .replace({
          path: "/teacher/examHome/test",
        })
        .catch((err) => console.log(err));
    },
    save() {
      console.log(this.problemsList);
      let data = new FormData();
      console.log(this.pageTitle);
      data.append("exam_name", this.pageTitle);
      data.append("questions", JSON.stringify(this.problemsList));
      data.append("comment", "<comment>");
      createPage(this.$cookies.get("session_key"), data).then((res) => {
        console.log(res, "创建试卷");
        if (res.code === 0) {
          this.clearPageData({
            key: "title",
            val: "",
          });
          this.clearPageData({
            key: "exam_id",
            val: "",
          });
          this.clearPageData({
            key: "selectProblem",
            val: [],
          });
          clearCache("exam_id");
          clearCache("title");
          clearCache("selectProblem");
          this.$router.replace({
            path: "/teacher/examHome/examPaper",
          });
        }
      });
    },
    modify() {
      let data = new FormData();
      data.append("exam_name", this.pageTitle);
      data.append("exam_id", this.page.exam_id);
      data.append("questions", JSON.stringify(this.problemsList));
      data.append("comment", "<comment>");
      modifyPage(this.$cookies.get("session_key"), data).then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.clearPageData({
            key: "title",
            val: "",
          });
          this.clearPageData({
            key: "exam_id",
            val: "",
          });
          this.clearPageData({
            key: "selectProblem",
            val: [],
          });
          clearCache("exam_id");
          clearCache("title");
          clearCache("selectProblem");
          this.$router.replace({
            path: "/teacher/examHome/examPaper",
          });
        }
      });
    },
  },
  computed: {
    ...mapState("tTest", ["page"]),
    createD() {
      return !!getCache("exam_id");
    },
    params() {
      return JSON.parse(JSON.stringify(this.page.selectProblem));
    },
  },
  watch: {
    pageTitle: {
      handler(newVal, oldVal) {
        this.page.title = newVal;
      },
    },
    params: {
      handler(newVal, oldVal) {
        console.log(newVal);
        setCache("selectProblem", this.params);
        this.getProblems();
      },
      immediate: true,
    },
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
  margin-top: 10px;
  display: flex;
  flex-direction: column;
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
            span {
              margin-left: 5px;
            }
          }
        }
      }
      .preview-score {
        min-height: 200px;
        background: #fff;
        margin-top: 15px;
        .score-head {
          height: 32px;
          padding: 10px 0;
        }
      }
    }
  }
}
</style>