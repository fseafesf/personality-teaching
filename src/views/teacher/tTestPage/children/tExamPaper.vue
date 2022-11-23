<template>
  <div class="examPaper">
    <div class="examHead">
      <div class="examSearch">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
      </div>
      <div class="examBtn">
        <el-button type="primary" @click="queryPaper">查询试卷</el-button>
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
        <el-table-column label="创建时间" align="center" width="250">
          <template v-slot="scope">
            {{ formDate(scope.row.update_time) }}
          </template>
        </el-table-column>
        <el-table-column label="难易度" align="center" width="100">
        </el-table-column>
        <el-table-column label="分值" align="center" width="100">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template v-slot="scope">
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
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :current-page="param.page"
        :total="total"
        :page-size="param.page_size"
        @current-change="handleCurrentChange"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { deletePage, searchPage, search, createPage } from "@/services";
import { mapActions, mapMutations, mapState } from "vuex";
import { setCache, getCache, clearCache } from "@/utils/localstorage";
import { formDate } from "@/utils/Date/formatDate";
export default {
  name: "tExamPaper",
  data() {
    return {
      input: "",
      tableData: [],
      total:0,
      param: {
        page: 1,
        page_size: 10,
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
    this.clearPageData({
      key: "comment",
      val: "",
    });
    clearCache("exam_id");
    clearCache("title");
    clearCache("selectProblem");
    clearCache("comment");
    this.getPages();
  },
  mounted() {},
  methods: {
    ...mapMutations("tTest", ["initPages", "clearPageData"]),
    ...mapActions("tTest", ["getInitPages", "getProblems"]),
    formDate,
    // 获取试卷列表
    getPages() {
      this.getInitPages({
        cookie: this.$cookies.get("session_key"),
        ...this.param,
      }).then((res) => {
        this.total = res
        this.tableData = this.pages;
      });
    },

    // 查询试卷
    queryPaper() {
      console.log(
        typeof JSON.stringify({
          text: this.input,
        })
      );
      if (this.input.trim() !== "") {
        search(
          this.$cookies.get("session_key"),
          {
    "text": this.input
}
        )
          .then((res) => {
            console.log(res);
            this.tableData = res.data.exam_list;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 新增试卷
    composePaper() {
      this.$router.replace({
        path: "/teacher/examHome/test",
      });
    },

    // 编辑试卷
    handleEdit(index, row) {
      this.$router.replace({
        path: "/teacher/examHome/preview",
        query: {
          id: row.exam_id,
        },
      });
      setCache("exam_id", row.exam_id);
    },

    // 复制试卷
    handleCopy(index, row) {
      searchPage("", row.exam_id).then((res) => {
        let data = new FormData();
        data.append("exam_name", res.data.exam_name);
        data.append("questions", res.data.questions);
        data.append("comment", res.data.comment);
        // console.log(data)
        createPage("", data).then(() => {
          this.$message({
            type: "success",
            message: "复制成功",
          });
          this.getPages();
        });
      });
    },

    // 删除试卷
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该试卷, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletePage(this.$cookies.get("session_key"), row.exam_id).then(
            (res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getPages();
            }
          );
        })
        .catch(() => {});
    },

    //发布试卷
    handleRelease(index, row) {
      console.log(row.exam_id);
      this.$router.replace({
        path: "/teacher/examHome/release",
        query: {
          id: row.exam_id,
        },
      });
    },
    handleCurrentChange(newPage) {
      this.param.page = newPage;
      this.getPages();
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
    min-height: 600px;
    background: #ffffff;
  }
  .block {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>