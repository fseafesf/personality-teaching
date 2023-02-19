<template>
  <div>
    <!-- 班级信息 -->
    <div class="header">
      <div class="classInfo">
        <span><strong>班级名称：</strong>{{$store.state.tClass.classInfo.name}}</span>
        <span><strong>班级描述：</strong>{{$store.state.tClass.classInfo.major}}</span>
        <span><strong>任课老师：</strong>{{$store.state.tClass.teacherInfo.name}}</span>
      </div>
      <el-button type="success" size="mini" @click="$router.go(-1)">返回</el-button>
    </div>

    <!-- 学生列表 -->
    <div class="studentBox">
      <h3 class="title">学生列表</h3>
      <el-button type="primary" size="small" @click="unJoinStuFn">添加学生</el-button>
      <el-table
        :data="$store.state.tClass.studentList"
        stripe
        style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="student_no" label="学号"></el-table-column>
        <el-table-column prop="college" label="学院"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="phone_number" label="电话号码"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="danger" size="mini" @click="deleteStuFn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="stuHandleSizeChange"
          @current-change="stuHandleCurrentChange"
          :current-page="$store.state.tClass.stuListPage.page_num"
          :page-sizes = "[10, 20, 100]"
          :page-size="$store.state.tClass.stuListPage.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="+this.$store.state.tClass.studentTotal"
          style="margin-top: 12px">
      </el-pagination>
    </div>

     <!-- 未加入班级学生 -->
    <el-dialog title="未加入班级的学生" :visible.sync="dialogTableVisible" width="70%">
      <div>
        <el-input v-model="keyword" placeholder="请输入学生姓名" class="searchStu"></el-input>
        <el-button type="primary" @click="resetFn">重置</el-button>
      </div>
      <el-table :data="$store.state.tClass.unJoinClassList" style="width: 100%">
        <el-table-column type="index" label="序号" width="80px"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="student_no" label="学号"></el-table-column>
        <el-table-column property="college" label="学院"></el-table-column>
        <el-table-column property="major" label="专业"></el-table-column>
        <el-table-column property="phone_number" label="电话号码"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="addStuToClassFn(scope.row)">添加</el-button>
          </template>         
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="$store.state.tClass.unJoinStuPage.page_num"
          :page-sizes = "[10, 20, 30]"
          :page-size="$store.state.tClass.unJoinStuPage.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="+$store.state.tClass.unJoinStuTotal"
          style="margin-top: 12px">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import { deleteStuAPI, addStuToClassAPI } from '@/services/modules/teacher/tClass.js'
import { mapActions } from 'vuex'
export default {
  name: 'classInfo',
  data() {
    return {
      dialogTableVisible: false,   // 未加入班级学生对话框是否显示
      keyword: "",
    }
  },
  mounted() {
    this.$store.dispatch("getPointedClassIdActions", this.$route.params.id)
    this.getTeacherInfoActions()
    this.getStuListActions()
  },
  watch: {
    keyword(val) {
      this.$store.state.tClass.content = val
      this.getUnJoinClsStuActions()
    }
  },
  methods: {
    ...mapActions(['getStuListActions', 'getTeacherInfoActions', 'getUnJoinClsStuActions']),
    // 获取未加入班级学生
    async unJoinStuFn() {
      this.dialogTableVisible = true
      this.getUnJoinClsStuActions()
    },
    // 未加入班级学生页码
    handleSizeChange(sizes) {
      this.$store.state.tClass.unJoinStuPage.page_size = sizes
      this.$store.state.tClass.unJoinStuPage.page_num = 1
      this.unJoinStuFn()
    },
    handleCurrentChange(nowPage) {
      this.$store.state.tClass.unJoinStuPage.page_num = nowPage
      this.unJoinStuFn()
    },
    // 学生列表页面改变
    stuHandleSizeChange(sizes) {
      this.$store.state.tClass.stuListPage.page_num = 1
      this.$store.state.tClass.stuListPage.page_size = sizes
      this.getStuListActions()
    },
    stuHandleCurrentChange(nowPage) {
      this.$store.state.tClass.stuListPage.page_num = nowPage
      this.getStuListActions()
    },
    // 删除学生
    deleteStuFn(obj) {
      this.$confirm('是否将' + obj.name + '移出' + this.$store.state.tClass.classInfo.name + '？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteStuAPI({class_id:this.$store.state.tClass.classId, student_id:obj.student_id})
        console.log(res)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        }
        if (this.$store.state.tClass.studentList.length === 1) { 
          if (this.$store.state.tClass.stuListPage.page_num > 1) {
            this.$store.state.tClass.stuListPage.page_num--
          }
        }
        this.getStuListActions()
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })     
    },
    // 添加学生到指定班级
    async addStuToClassFn(obj) {
      const res = await addStuToClassAPI(this.$store.state.tClass.classId, obj.student_id)
      if (res.code === 0) {
        this.$message.success(res.msg)
        this.unJoinStuFn()
        this.getStuListActions({ cookie: this.$cookies.get("session_key") })
      }
    },
    // 重置按钮
    resetFn() {
      this.keyword = ''
    },
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
    min-height: calc(100vh - 120px);
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    .title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .addStuBtn {
      margin: 16px 0;
    }
  }

  .searchStu {
    width: 300px;
    margin-right: 10px;
  }
</style>