<template>
  <div>
    <el-table
        :data="studentList"
        stripe
        style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="学生姓名"></el-table-column>
        <el-table-column prop="college" label="学院"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="tel" label="电话号码"></el-table-column>
        <el-table-column label="操作">
          <el-button type="danger" size="mini">添加</el-button>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: "unJoinClassStu",
  data() {
    return {
      studentList: [
        {
          name: '张三',
          college: '计科',
          major: '计科',
          tel: '110120119'
        },
        {
          name: '李四',
          college: '计科',
          major: '计科',
          tel: '110120119'
        },
        {
          name: '王五',
          college: '计科',
          major: '计科',
          tel: '110120119'
        },
      ]
    }
  }
}
</script>

<style>

</style>