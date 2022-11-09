<template>
  <div class="examPaper">
    <div class="examHead">
      <div class="examSearch">
        <el-input placeholder="请输入内容" v-model="input" clearable>
        </el-input>
      </div>
      <div class="examBtn">
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
import { getPageList } from "@/services";
import { mapMutations, mapState } from "vuex";
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
    this.getPages();
  },
  mounted() {
    
  },
  methods: {
    ...mapMutations("tTest", ["initPages"]),
    async getPages() {
      await getPageList(this.$cookies.get("session_key"), this.param).then(
        (res) => {
          console.log(res);
          this.initPages(res.data);
          this.tableData = this.pages;
        }
      );
    },
    composePaper() {
      this.$router.replace({
        path: "/teacher/examHome/test",
      });
    },

    handleEdit(index, row) {
      this.$router.push({
        path: "/teacher/examHome/preview",
        query: {
          id: row.id,
        },
      });
    },
    handleDelete(index, row) {
      console.log(row.exam_id);
    },
    handleRelease(index, row) {
      console.log(row.id);
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