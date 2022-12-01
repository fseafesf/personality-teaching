<template>
  <div class="release">
    <div class="back" @click="this.back">
      <i class="el-icon-back"></i>
      <span class="back-content">返回试卷列表</span>
    </div>
    <div class="content">
      <div class="release-title">
        <span>作业标题:</span>
      </div>
      <div class="release-object">
        <span>发送对象:</span>
        <el-radio-group v-model="radio" @change="change">
          <el-radio label="班级"> </el-radio>
          <el-radio label="个人"></el-radio>
        </el-radio-group>
      </div>
      <div class="release-content">
        <div class="release-class" v-if="radio == '班级'">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 30px 0"></div>
          <el-checkbox-group
            v-model="checkedClasses"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="item in classList"
              :label="item"
              :key="item.class_id"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </div>

        <div class="release-student" v-else>
          <div class="student-head">
            <el-select
              v-model="value"
              clearable
              placeholder="请选择"
              size="small"
              @change="selectChange"
            >
              <el-option
                v-for="item in options"
                :key="item.class_id"
                :label="item.name"
                :value="item.class_id"
              >
              </el-option>
            </el-select>
            <el-input
              placeholder="请输入内容"
              v-model="input"
              size="small"
            >
            </el-input>
            <el-button type="primary" size="mini" @click="searchStu"
              >搜索</el-button
            >
          </div>
          <el-table
            ref="multipleTable"
            :data="seTableData"
            tooltip-effect="dark"
            style="width: 80%"
            max-height="300"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="college" label="学院" width="230">
            </el-table-column>
            <el-table-column prop="major" label="专业" width="300">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="150">
            </el-table-column>
            <el-table-column
              prop="phone_number"
              label="电话"
              show-overflow-tooltip
              width="150"
            >
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div>
        </div>
      </div>
      <div class="release-time">
        <span>发送时间:</span>
        <div>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dateChange"
            :picker-options="timeOption"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="release-comment">
        <span>输入备注:</span>
        <el-input placeholder="输入备注" v-model="comment" clearable>
        </el-input>
      </div>
      <div class="release-btn">
        <el-button type="primary" @click="release">发布</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { releasePageClass, releasePageStudent } from "@/services";
import { transfromClass, transfromStudent } from "@/utils/transfrom";
import { formDate, getToday } from "@/utils/Date/formatDate";
import { mapState, mapActions } from "vuex";
export default {
  name: "release",
  data() {
    return {
      pageId: String,
      radio: "班级",

      // 班级列表请求参数
      classQueryInfo: {
        page_num: 1,
        page_size: 10,
      },

      // 班级全选
      checkAll: false,

      // 选择的班级
      checkedClasses: [],

      //班级列表
      classList: [],

      //学生
      studentQueryInfo: {
        page_num: 1,
        page_size: 40,
      },

      // 班级筛选
      options: [],

      // 选择的班级
      value: "",
      input: "",

      // 复制的一份表格数据
      seTableData: [],

      // 学生表格数据
      tableData: [],
      multipleSelection: [],

      // 日期时间选择器
      clear: false,
      value1: [],
      // 只能选择当前时间以后的时间
      timeOption: {
        disabledDate(date) {
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      comment: "",
    };
  },
  created() {
    this.pageId = this.$route.query.id;
    this.getClass();
    this.value1 = getToday();
  },
  methods: {
    ...mapActions("tTest", ["getClasses", "getStudents"]),
    formDate,
    getClass() {
      this.getClasses(this.classQueryInfo).then((res) => {
        this.classList = this.classes;
        this.options = this.classList;
        this.value = this.options[0].class_id;
        this.getStu();
      });
    },
    getStu() {
      this.getStudents({
        cookie: this.$cookies.get("session_key"),
        class_id: this.value,
        page_num: this.studentQueryInfo.page_num,
        page_size: this.studentQueryInfo.page_size,
      }).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.seTableData = JSON.parse(JSON.stringify(this.tableData));
      });
    },
    back() {
      this.$router.push({
        path: "/teacher/examHome",
      });
    },

    // 班级 个人选择切换
    change(label) {
      console.log(label);
    },

    // 班级全选
    handleCheckAllChange(val) {
      this.checkedClasses = val ? this.classList : [];
      console.log(this.checkedClasses);
    },
    // 班级单选
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.classList.length;
      console.log(this.checkedClasses);
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 下拉菜单
    selectChange() {
      console.log(this.value);
      if (this.value.trim() !== "") {
        this.getStu();
      }
      this.seTableData = [];
    },
    searchStu() {
      if (this.input.trim !== "") {
        this.seTableData = this.seTableData.filter((item) => {
          return item.name.includes(this.input);
        });
      }
    },
    // 学生多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },

    // 时间改变
    dateChange() {
      console.log(formDate(this.value1[0]), formDate(this.value1[1]));
    },

    // 发布
    release() {
      if (this.comment.trim() === "") {
        console.log("请输入备注");
        this.$message({
          type: "info",
          message: "请输入备注",
          duration: 1000,
        });
      } else {
        if (this.radio === "班级") {
          if (this.checkedClasses.length === 0) {
            this.$message({
              type: "info",
              message: "请选择发放对象",
              duration: 1000,
            });
          } else {
            let data = {
              class_list: transfromClass(this.checkedClasses),
              exam_id: this.pageId,
              start_time: formDate(this.value1[0]),
              end_time: formDate(this.value1[1]),
              comment: this.comment,
            };
            releasePageClass(data).then((res) => {
              console.log(res);
              this.checkedClasses = [];
              this.comment = ""
            });
          }
        } else if (this.radio === "个人") {
          if (this.multipleSelection.length === 0) {
            this.$message({
              type: "info",
              message: "请选择发放对象",
              duration: 1000,
            });
          } else {
            console.log("个人发布");
            let data = {
              student_list: transfromStudent(this.multipleSelection),
              exam_id: this.pageId,
              start_time: formDate(this.value1[0]),
              end_time: formDate(this.value1[1]),
              comment: this.comment,
            };
            releasePageStudent(data).then((res) => {
              console.log(res);
            });
          }
        }
      }
    },
  },
  watch: {
    input: {
      handler(newVal,oldVal){
        console.log(newVal)
        if(newVal.trim() == ""){
          this.seTableData = JSON.parse(JSON.stringify(this.tableData))
        }
      }
    },
  },
  computed: {
    ...mapState("tTest", ["classes"]),
  },
};
</script>

<style lang="less" scoped>
.release {
  display: flex;
  flex-direction: column;
  min-height: 400px;

  .back {
    display: flex;
    align-items: center;
    width: 20%;
    height: 50px;
    margin: 10px 0 0 0;
    cursor: pointer;
    .back-content {
      margin-left: 10px;
    }
  }
  .content {
    background-color: #fff;
    margin-top: 10px;
    // min-height: 300px;
    padding: 20px;
    .release-title {
      font-weight: 300;
      margin-bottom: 20px;
    }
    .release-object {
      height: 50px;
      line-height: 50px;
      span {
        margin-right: 20px;
      }
    }
    .release-content {
      padding: 20px;
      // min-height: 250px;
      .release-class {
        .el-checkbox-group {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }
      }
      .release-student {
        .student-head {
          display: flex;
          width: 35%;
          .el-select {
            margin-bottom: 20px;
            margin-right: 20px;
          }
          .el-button {
            margin-left: 10px;
            height: 32px;
          }
        }
      }
    }
    .release-time {
      margin: 20px 0 20px 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .release-comment {
      span {
        width: 80px;
      }
      width: 60%;
      margin: 20px 0 20px 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>