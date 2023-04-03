<template>
  <div class="student">
    <!-- 搜索 -->
    <div class="search">   
      <el-autocomplete
        class="inputBox"
        v-model="keyword"
        :fetch-suggestions="querySearch"
        placeholder="请输入学生姓名 / 学号"
        :trigger-on-focus="false"
        value-key = "name"
        @select="handleSelect"
      >
      </el-autocomplete>
      <el-button type="primary"  @click="resetFn">重置</el-button> 
    </div>
    
    <!-- 知识点掌握情况 -->
    <div class="main">
      <h3 class="stuAna" v-if="studentName">{{studentName}}的学情分析</h3>
      <el-table 
        :data="studentInfo"
        border
        style="width: 70%"
        :cell-style = "{borderColor: 'lightGray'}"
        :header-cell-style="{borderColor: 'lightGray'}"
        v-if="studentName"
        class="elTable"
      >
        <el-table-column prop="name" label="姓名" width="140px"></el-table-column>
        <el-table-column prop="student_no" label="学号"></el-table-column>
        <el-table-column prop="college" label="学院"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="phone_number" label="联系电话"></el-table-column>
      </el-table>
      <PointTree v-if="studentName"></PointTree>
    </div>         
  </div>
</template>

<script>
import { searchStudentAPI } from '@/services/modules/teacher/tAnalysis.js'
import PointTree from "@/components/teacher/tAnalysis/pointsTree.vue"

export default {
  name: "studentAnalysis",
  components: { PointTree },
  data() {
    return {
      keyword: "",  // 搜索关键字
      studentName: "", 
      studentInfo: [],
      searchStudentList: []  
    }
  },
  methods: {
    async querySearch(queryString, cb) {
      const res = await searchStudentAPI(this.keyword)
      this.searchStudentList = res.data
      // 调用 callback 返回建议列表的数据
      cb(this.searchStudentList)
    },
    // 重置按钮
    resetFn() {
      this.keyword = ""
    },
    handleSelect(item) {
      this.studentName = item.name
      this.studentInfo.push(item)
      this.keyword = ""
    }
  }
}
</script>

<style lang="less" scoped>
  .student {
    width: 100%;
    min-height: calc(100vh - 120px);
    margin-top: 10px;
    background-color: #fff;
    border-radius: 4px;
    padding-left: 16px;
    box-sizing: border-box;
    .search {
      .inputBox {
        width: 240px;
        margin: 10px 10px 10px 0;
      }
      margin-bottom: 20px;
    }
    .stuAna {
      margin-bottom: 20px;
    }
    .el-tree {
      width: 400px;
      .el-progress {
        display: inline;
        margin-left: 10px;
      }
    }
    .elTable {
      margin: 30px 0;
      border: 1px solid lightGray;
    }
  }
</style>