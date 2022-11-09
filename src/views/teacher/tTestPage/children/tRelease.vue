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
          <el-radio label="个人">个人</el-radio>
        </el-radio-group>
      </div>
      <div class="release-content">
        <div class="release-class" v-if="radio == '班级'">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{
              city
            }}</el-checkbox>
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
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              placeholder="请输入内容"
              v-model="input"
              clearable
              size="small"
            >
            </el-input>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            max-height="300"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip>
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
          >
          </el-date-picker>
        </div>
      </div>
      <div class="release-comment">
        <el-input placeholder="输入备注" v-model="comment" clearable>
        </el-input>
      </div>
      <div class="release-btn">
        <el-button type="primary">发布</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const cityOptions = ["一班", "二班", "三班", "四班"];
export default {
  name: "release",
  data() {
    return {
      pageId: Number,
      radio: "班级",
      objectShow: Boolean,
      // 班级
      checkAll: false,
      checkedCities: ["一班", "二班"],
      cities: cityOptions,
      isIndeterminate: true,

      //学生
      options: [
        {
          value: "一班",
          label: "一班",
        },
        {
          value: "二班",
          label: "二班",
        },
      ],
      value: "",
      input: "",
      seTableData: [],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      comment: "",
    };
  },
  created() {
    this.pageId = this.$route.query.id;
  },
  methods: {
    back() {
      this.$router.push({
        path: "/teacher/examHome",
      });
    },
    change(label) {
      console.log(label);
    },
    handleCheckAllChange(val) {
      console.log(val);
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
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
    selectChange() {
      console.log(this.value);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
      .release-student {
        .student-head {
          display: flex;
          width: 30%;
          .el-select {
            margin-bottom: 20px;
            margin-right: 20px;
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
    .release-comment{
      width: 30%;
      margin: 20px 0 20px 0;
    }
  }
}
</style>