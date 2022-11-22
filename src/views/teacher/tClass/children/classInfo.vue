<template>
  <div>
    <!-- 班级信息 -->
    <div class="header">
      <div class="classInfo">
        <span><strong>班级名称：</strong>{{$store.state.tClass.classInfo.name}}</span>
        <span><strong>班级描述：</strong>{{$store.state.tClass.classInfo.major}}</span>
        <span><strong>任课老师：</strong>{{$store.state.tClass.teacherInfo.name}}</span>
      </div>
      <el-button type="success" size="mini" @click="$router.go(-1)">退出</el-button>
    </div>

    <!-- 学生列表 -->
    <div class="studentBox">
      <h3 class="title">学生列表</h3>
      <el-button type="primary" size="small" class="addStuBtn" @click="addStudentFn">新增学生</el-button>
      <el-button type="primary" size="small" @click="unjoinStuFn">未加入班级学生</el-button>
      <el-table
        :data="$store.state.tClass.studentList"
        stripe
        style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
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
          :page-sizes = "[10, 20, 30]"
          :page-size="$store.state.tClass.stuListPage.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="+this.$store.state.tClass.studentTotal"
          style="margin-top: 12px">
      </el-pagination>
    </div>

    <!-- 新增学生对话框 -->
    <el-dialog title="新增学生" :visible.sync="dialogUnJoinVisible" width="40%" @close="dialogCloseFn">
      <el-form :model="addStuForm" ref="addStuRef" label-width="90px" :rules="addStuRules">
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="addStuForm.name" minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="学院:" prop="college">
          <el-input v-model="addStuForm.college" minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="专业:" prop="major">
          <el-input v-model="addStuForm.major" minlength="1"></el-input>
        </el-form-item>
        <el-form-item label="电话号码:" prop="phone_number">
          <el-input v-model="addStuForm.phone_number" minlength="1"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUnJoinVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddStuFn" >保存</el-button>
      </div>
    </el-dialog>

     <!-- 未加入班级学生 -->
    <el-dialog title="未加入班级的学生" :visible.sync="dialogTableVisible" width="70%">
      <el-table :data="unJoinClassList" style="width: 100%">
        <el-table-column type="index" label="序号" width="80px"></el-table-column>
        <el-table-column property="name" label="学生姓名"></el-table-column>
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
          :current-page="unJoinStuPage.page_num"
          :page-sizes = "[10, 20, 30]"
          :page-size="unJoinStuPage.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="unJoinStuTotal"
          style="margin-top: 12px">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import { addStudentAPI, getUnjoinStuAPI, deleteStuAPI, addStuToClassAPI } from '@/services/modules/teacher/tClass.js'
import { mapActions } from 'vuex'
export default {
  name: 'classInfo',
  data() {
    return {
      addStuForm: {  // 未加入班级的信息
        name: "",
        college: "",
        major: "",
        phone_number: ""
      }, 
      dialogUnJoinVisible: false,  // 新增学生对话框是否显示
      dialogTableVisible: false,   // 未加入班级学生对话框是否显示
      unJoinClassList: [],  // 未加入班级学生列表    
      unJoinStuPage: {  // 未加入班级学生页码
        page_num: 1,
        page_size: 10
      },   
      unJoinStuTotal: 0,
      // 新增学生表单验证规则
      addStuRules: {
        name: [
          {required: true, message: "请输入学生姓名", trigger: "blur"}
        ],
        college: [
          {required: true, message: "请输入学院名", trigger: "blur"}
        ],
        major: [
          {required: true, message: "请输入专业名", trigger: "blur"}
        ],
        phone_number: [
          {required: true, message: "请输入学生电话号码", trigger: "blur"},
          {pattern: /^1([3456789])\d{9}$/, message: "电话号码必须是11位且以1开头,第二位数字是3456789中的一位", trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    ...mapActions(['getStuListActions']),
    // 获取未加入班级学生
    async unjoinStuFn() {
      this.dialogTableVisible = true
      const res = await getUnjoinStuAPI(this.$cookies.get("session_key"), this.unJoinStuPage)
      this.unJoinStuTotal = res.total
      this.unJoinClassList = res.data
    },
    // 点击新增学生按钮
    addStudentFn() {
      this.dialogUnJoinVisible = true
    },
    // 关闭对话框
    dialogCloseFn() {
      this.$refs.addStuRef.resetFields()
    },
    // 未加入班级学生页码
    handleSizeChange(sizes) {
      this.unJoinStuPage.page_size = sizes
      this.unJoinStuPage.page_num = 1
      this.unjoinStuFn()
    },
    handleCurrentChange(nowPage) {
      this.unJoinStuPage.page_num = nowPage
      this.unjoinStuFn()
    },
    // 学生列表页面改变
    stuHandleSizeChange(sizes) {
      this.$store.state.tClass.stuListPage.page_num = 1
      this.$store.state.tClass.stuListPage.page_size = sizes
      this.getStuListActions(this.$store.state.tClass.stuListPage)
    },
    stuHandleCurrentChange(nowPage) {
      this.$store.state.tClass.stuListPage.page_num = nowPage
      this.getStuListActions(this.$store.state.tClass.stuListPage)
    },
    // 新增学生
    confirmAddStuFn() {
      this.$refs.addStuRef.validate(async valid => {
        if (valid) {
          const res = await addStudentAPI(this.$cookies.get("session_key"),this.addStuForm)
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.dialogUnJoinVisible = false
          }   
        } else {
          return false
        }
      })
         
    }, 
    // 删除学生
    deleteStuFn(obj) {
      this.$confirm('是否删除学生？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteStuAPI(this.$cookies.get("session_key"),{class_id:this.$store.state.tClass.classId, student_id:obj.student_id})
        if (res.code === 0) {
          this.getStuListActions({ cookie: this.$cookies.get("session_key") })
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        }
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })     
    },
    // 添加学生到指定班级
    async addStuToClassFn(obj) {
      const res = await addStuToClassAPI(this.$cookies.get("session_key"), this.$store.state.tClass.classId, obj.student_id)
      if (res.code === 0) {
        this.$message.success(res.msg)
        this.unjoinStuFn()
        this.getStuListActions({ cookie: this.$cookies.get("session_key") })
      }
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