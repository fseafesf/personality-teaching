<template>
  <div class="examPaper">
    <div class="examHead">
      <div class="examSearch">
        <el-input
          placeholder="请输入内容"
          @change="queryPaper"
          v-model="input"
          clearable
        >
        </el-input>
      </div>
      <div class="examBtn">
        <el-button type="primary">查询试卷</el-button>
        <el-button type="primary" @click="composePaper">新增试卷</el-button>
      </div>
    </div>
    <div class="examList">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="100" align="center" type="index">
        </el-table-column>
        <el-table-column
          label="试卷标题"
          align="center"
          width="300"
          prop="exam_name"
        >
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          width="250"
          prop="update_time"
        >
        </el-table-column>
        <el-table-column label="难易度" align="center" width="100">
        </el-table-column>
        <el-table-column label="分值" align="center" width="100">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" @click="handleCopy(scope.$index, scope.row)"
              >复制</el-button
            >
            <el-button
              size="mini"
              @click="handleRelease(scope.$index, scope.row)"
              >发布</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { deletePage, searchPage } from "@/services";
import { mapActions, mapMutations, mapState } from "vuex";
import { setCache, getCache, clearCache } from "@/utils/localstorage";
export default {
  name: "tExamPaper",
  data() {
    return {
      input: "",
      tableData: [],
      param: {
        page: "1",
        page_size: "10",
      },
    };
  },
  created() {
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
    this.getPages();
  },
  mounted() {},
  methods: {
    ...mapMutations("tTest", ["initPages", "clearPageData"]),
    ...mapActions("tTest", ["getInitPages", "getProblems"]),
    getPages() {
      this.getInitPages({
        cookie:this.$cookies.get("session_key"),
        ...this.param
      }).then((res) => {
        this.tableData = this.pages;
      });
    },
    queryPaper() {
      if (this.input.trim() !== "") {
        searchPage(this.$cookies.get("session_key"), this.input).then((res) => {
          console.log(res);
          this.tableData = Array.of(res.data);
        });
      }
    },
    composePaper() {
      this.$router.replace({
        path: "/teacher/examHome/test",
      });
    },

    handleEdit(index, row) {
      this.$router.replace({
        path: "/teacher/examHome/preview",
        query: {
          id: row.exam_id,
        },
      });
      setCache("exam_id", row.exam_id);
    },
    handleCopy(index,row){
      
    },
    handleDelete(index, row) {
      console.log(row.exam_id);
      deletePage(this.$cookies.get("session_key"), row.exam_id).then((res) => {
        console.log(res);
        this.getPages();
      });
    },
    handleRelease(index, row) {
      console.log(row.exam_id);
      this.$router.replace({
        path: "/teacher/examHome/release",
        query: {
          id: row.id,
        },
      });
    },
  },
  computed: {
    ...mapState("tTest", ["pages"]),
  },
  watch: {
    input: {
      handler(newVal, oldVal) {
        if (newVal.trim() == "") {
          this.tableData = this.pages;
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.examPaper {
  display: flex;
  flex-direction: column;
  .examHead {
    width: 50%;
    padding: 10px;
    background: #ffffff;
    margin: 10px 0 10px 0;
    display: flex;
    .examSearch {
      margin-right: 20px;
    }
    .examBtn {
      display: flex;
    }
  }
  .examList {
    min-height: 500px;
    background: #ffffff;
  }
}
</style>