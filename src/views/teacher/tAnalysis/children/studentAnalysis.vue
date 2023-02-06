<template>
  <div class="student">
    <h2>个人学情分析</h2>
    <!-- 搜索 -->
    <div class="search">   
      <el-input type="text" placeholder="请输入学生姓名 / 学号" v-model="keyword" class="inputBox"></el-input>   
      <el-button type="primary" @click="searchFn">搜索</el-button>
      <el-button type="primary"  @click="resetFn">重置</el-button> 
    </div>
    
    <!-- 知识点掌握情况 -->
    <div class="main">
      <h3 class="stuAna">张三的学情分析</h3>
      <el-tree :data="knowledgeList">
        <span class="treeNode" slot-scope="{ node, data }">
          <span>{{node.label}}</span>
          <el-progress v-if="percentage >= 90" :text-inside="true" :stroke-width="20" :percentage="percentage" status="success"></el-progress>
          <el-progress v-else-if="percentage >= 70" :text-inside="true" :stroke-width="24" :percentage="80"></el-progress>
          <el-progress v-else="percentage < 70" :text-inside="true" :stroke-width="30" :percentage="percentage" status="exception"></el-progress>
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
      keyword: "",  // 搜索关键字
      percentage: 90,
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
      this.keyword = ""
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
    padding-left: 16px;
    h2 {
      height: 60px;
      line-height: 60px;
      // padding-left: 14px;
      margin-bottom: 8px;
      border-bottom: 1px solid rgb(222, 222, 222);
    }
    .search {
      .inputBox {
        width: 240px;
        margin: 0 10px 10px 0;
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
  }
</style>