<template>
  <div>
    <!-- 班级信息 -->
    <div class="header">
      <div class="classInfo">
        <span><strong>班级名称：</strong>{{$store.state.tClass.checkClassName}}</span>
        <span><strong>班级描述：</strong>{{$store.state.tClass.checkClassMajor}}</span>
        <span><strong>任课老师：</strong>{{teacherInfo.name}}</span>
      </div>
      <el-button type="success" size="mini" @click="$router.go(-1)">退出</el-button>
    </div>

    <!-- 学生信息 -->
    <div class="studentBox">
      <h3 class="title">学生列表</h3>
      <el-button type="primary" size="small" class="addStuBtn">添加学生</el-button>
      <el-table
        :data="studentList"
        stripe
        style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="学生姓名"></el-table-column>
        <el-table-column prop="studentId" label="学号"></el-table-column>
        <el-table-column label="操作">
          <el-button type="danger" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classInfo',
  data() {
    return {
      // 班级信息
      classInfo:{
        class_id: '1',
        name: '2001班',
        major: '计算机科学与技术专业' 
      },
      // 教师信息
      teacherInfo: {
        teacher_id: '1',
        name: '王肖'
      },
      // 学生列表
      studentList: [
        {
          studentId: '2001',
          name: '张三'
        },
        {
          studentId: '2002',
          name: '李四'
        },
        {
          studentId: '2003',
          name: '王五'
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  * {
    box-sizing: border-box;
  }
  .header {
    position: relative;
    // 班级信息
    .classInfo {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 120px;
      margin: 10px 0;
      justify-content: center;
      padding-left: 20px;
      border-radius: 4px;
      background-color: #fff;
      span:nth-child(2) {
        margin: 16px 0;
      }
    }
    .el-button {
      position: absolute;
      right: 20px;
      top: 10px;
    }
  }

  // 学生信息
  .studentBox {
    width: 100%;
    height: calc(100vh - 120px);
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    .title {
      font-size: 20px;
      font-weight: 500;
    }
    .addStuBtn {
      margin: 16px 0;
    }
  }
</style>