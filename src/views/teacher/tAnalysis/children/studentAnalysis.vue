<template>
  <div class="student">
    <h2>个人学情分析</h2>
    <!-- 搜索 -->
    <div class="search">
      <el-form :model="searchForm" ref="searchForm" :inline="true">
        <el-form-item prop="keyword">
          <el-input type="text" placeholder="请输入学生姓名" v-model="searchForm.keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchFn">搜索</el-button>
          <el-button size="small" @click="resetFn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="main">
      <!-- 学生列表 -->
      <el-table :data="studentList" border>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
      </el-table>

      <!-- 知识点掌握情况 -->
      <el-tree :data="knowledgeList">
        <span class="treeNode" slot-scope="{ node, data }">
          <span>{{node.label}}</span>
          <el-progress v-if="percentage >= 90" :text-inside="true" :stroke-width="16" :percentage="percentage" status="success"></el-progress>
          <el-progress v-else-if="percentage >= 70" :text-inside="true" :stroke-width="16" :percentage="80"></el-progress>
          <el-progress v-else="percentage < 70" :text-inside="true" :stroke-width="16" :percentage="percentage" status="exception"></el-progress>
        </span>
      </el-tree>
    </div>
         
  </div>
</template>

<script>
export default {
  name: "studentAnalysis",
  data() {
    return {
      // 搜索关键字
      searchForm: {
        keyword: ""
      },
      percentage: 90,
      // 学生列表
      studentList: [
        {
          name: "张三",
          major: "计算机科学与技术",
        },
        {
          name: "李四",
          major: "网络工程"
        },
        {
          name: "王五",
          major: "软件工程"
        },
      ],
      // 知识点掌握情况
      knowledgeList: [{
        label: '大知识点一',
        children: [{
          label: '小知识点',
          children: [{
            label: '小小知识点'
          }]
        }]
      }, {
        label: '大知识点二',
        children: [{
          label: '小知识点一',
          children: [{
            label: '小小知识点'
          }]
        }, {
          label: '小知识点二',
          children: [{
            label: '小小知识点'
          }]
        }]
      }, {
        label: '大知识点三',
        children: [{
          label: '小知识点一',
          children: [{
            label: '小小知识点'
          }]
        }, {
          label: '小知识点二',
          children: [{
            label: '小小知识点'
          }]
        }]
      }],
    }
  },
  methods: {
    // 搜索按钮
    searchFn() {
      console.log("--------点击搜索")
    },
    // 重置按钮
    resetFn() {
      this.$refs.searchForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .student {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    h2 {
      height: 60px;
      line-height: 60px;
      padding-left: 14px;
      margin-bottom: 8px;
      border-bottom: 1px solid rgb(222, 222, 222);
    }
    .search {
      margin-left: 14px;
      .el-input {
        width: 300px;
      }
    }
    .main {
      display: flex;
      align-items: flex-start;
      .el-table {
        margin-left: 14px
      }
      .el-tree {
        display: inline-block;
        padding-left: 60px;
        width: 400px;
        .el-progress {
          display: inline;
          margin-left: 10px;
        }
      }
    }
  }
</style>