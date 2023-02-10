<template>
  <div class="student">
    <!-- 搜索 -->
    <div class="search">   
      <el-input type="text" placeholder="请输入学生姓名 / 学号" v-model="keyword" class="inputBox"></el-input>   
      <el-button type="primary" @click="searchFn">搜索</el-button>
      <el-button type="primary"  @click="resetFn">重置</el-button> 
    </div>
    
    <!-- 知识点掌握情况 -->
    <div class="main">
      <h3 class="stuAna">{{studentInfo[0].name}}的学情分析</h3>
      <el-table 
        :data="studentInfo"
        border
        style="width: 70%"
        :cell-style = "{borderColor: 'lightGray'}"
        :header-cell-style="{borderColor: 'lightGray'}"
        class="elTable">
        <el-table-column prop="name" label="姓名" width="140px"></el-table-column>
        <el-table-column prop="studentId" label="学号"></el-table-column>
        <el-table-column prop="college" label="学院"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
      </el-table>
      <PointTree></PointTree>
    </div>         
  </div>
</template>

<script>
import PointTree from "@/components/teacher/tAnalysis/pointsTree.vue"

export default {
  name: "studentAnalysis",
  components: { PointTree },
  data() {
    return {
      keyword: "",  // 搜索关键字
      studentInfo: [{
        name: "张三",
        studentId: "20230208",
        college: "计算机科学学院",
        major: "计算机科学与技术"
      }]
    }
  },
  methods: {
    // 搜索按钮
    searchFn() {
      console.log("--------点击搜索")
    },
    // 重置按钮
    resetFn() {
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
    }
    .stuAna {
      margin: 20px 0;
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