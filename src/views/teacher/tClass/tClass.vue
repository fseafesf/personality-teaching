<template>
  <div class="tClass">   
    <template v-if="!$route.meta.isChildren">
      <div class="header">
        <el-button type="primary" id="addClassBtn" size="small" class="addClassBtn" @click="addClassShowDialogBtn">创建班级</el-button>
        <el-button type="primary" size="small" class="addStuBtn" @click="addStudentFn">创建学生</el-button>
      </div>
      <!-- 班级列表 -->
      <el-table :data="$store.state.tClass.classList"
        border
        style="width: 100%">
        <el-table-column type="index" label="序号" width="80px"></el-table-column>
        <el-table-column prop="name" label="班级名" width="240px"></el-table-column>
        <el-table-column prop="college" label="学院名"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column label="操作" width="240px">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click.stop="checkClassInfoFn(scope.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="modifyClassFn(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="delClassBtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="$store.state.tClass.classPage.page_num"
          :page-sizes = "[5, 10, 20]"
          :page-size="$store.state.tClass.classPage.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="+this.$store.state.tClass.classNum">
        </el-pagination>
      </div>

      <!-- 新增 / 修改班级对话框 -->
      <el-dialog
        title="班级信息"
        :visible.sync="dialogVisible"
        width="40%"
        @close="dialogCloseFn">
        <el-form :model="addClassForm" ref="addClassRef" label-width="100px" :rules="classInfoRules">
          <el-form-item label="班级名称:" prop="name">
            <el-input v-model="addClassForm.name" minlength="1"></el-input>
          </el-form-item>
          <el-form-item label="学院:" prop="college">
            <el-input v-model="addClassForm.college" minlength="1"></el-input>
          </el-form-item>
          <el-form-item label="专业:" prop="major">
            <el-input v-model="addClassForm.major" minlength="1"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelFn">取消</el-button>
          <el-button type="primary" @click="confirmFn">确定</el-button>
        </span>
      </el-dialog>

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
    </template>
    
    <router-view></router-view>
  </div>
</template>

<script >
import { addClassAPI, deleteClassAPI, modifyClassAPI, addStudentAPI, getAppointedClassAPI } from '@/services/modules/teacher/tClass.js'
import { mapActions} from 'vuex';
export default {
  data() {
    return {
      dialogVisible: false,
      // 添加班级的数据对象
      addClassForm: {
        name: '',
        college: '',
        major: ''
      },
      isEdit: false, // true为编辑状态，false为新增状态
      editClassId: '', // 保存班级编号
      // 表单验证规则
      classInfoRules: {
        name: [
          {required: true, message: "请输入班级名", trigger: 'blur'}
        ],
        college: [
          {required: true, message: "请输入学院名", trigger: "blur"}
        ],
        major: [
          {required: true, message: "请输入专业名", trigger: "blur"}
        ]
      },
      dialogUnJoinVisible: false,  // 新增学生对话框是否显示
      addStuForm: {  // 未加入班级的信息
        name: "",
        college: "",
        major: "",
        phone_number: ""
      }, 
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
  mounted() {
    this.getClassInfoActions()
  },
  methods: {
    ...mapActions(['getClassInfoActions', 'getStuListActions', 'getTeacherInfoActions']),
    // 取消对话框
    cancelFn() {
      this.dialogVisible = false
    },
    // 关闭对话框
    dialogCloseFn() {
      this.$refs.addClassRef.resetFields()
    },
    // 创建班级
    addClassShowDialogBtn() {
      this.isEdit = false
      this.dialogVisible = true
    },
    // 创建/修改班级信息后保存
    confirmFn() {
      this.$refs.addClassRef.validate(async valid => {
        if (valid) {
          if (!this.isEdit) {  /// 创建班级
            const res = await addClassAPI(this.addClassForm)
            // console.log(res)
            if (res.code === 0) {
              this.$message.success(res.msg)
            }
          } else {  // 修改班级信息
            const res = await modifyClassAPI({ class_id: this.editClassId, ...this.addClassForm })
            // console.log(res)
            if (res.code === 0) {
              this.$message.success(res.msg)
            }      
          }
          this.getClassInfoActions()
          this.dialogVisible = false
        } else {
          return false
        }
      })
      
    },
    // 查看班级信息
    async checkClassInfoFn(obj) {
      this.$router.push({path:'/teacher/class/classInfo/' + obj.class_id})
      this.$store.state.tClass.classId = obj.class_id
    },
    // 删除班级
     delClassBtn(obj) {
      this.$confirm('是否删除该班级？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteClassAPI(obj.class_id)
        if (res.code === 0) {
        this.$message.success(res.msg)
        this.getClassInfoActions()
        this.$message({
          type: 'success',
          message: '删除成功！'
        })}
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
      })
      
    },
    // 修改班级信息
    modifyClassFn(obj) {
      // console.log(obj)
      this.isEdit = true
      this.dialogVisible = true
      this.editClassId = obj.class_id

      // 数据回显
      this.$nextTick(() => {
        this.addClassForm.name = obj.name
        this.addClassForm.college = obj.college
        this.addClassForm.major = obj.major
      })
    },
    // 分页->每页条数改变触发
    handleSizeChange(sizes) {
      this.$store.state.tClass.classPage.page_size = sizes
      this.$store.state.tClass.classPage.page_num = 1
      this.getClassInfoActions(this.$store.state.tClass.classPage)
    },
    // 当前页码改变时触发
    handleCurrentChange(nowPage) {
      this.$store.state.tClass.classPage.page_num = nowPage
      this.getClassInfoActions(this.$store.state.tClass.classPage)
    },
    // 点击新增学生按钮
    addStudentFn() {
      this.dialogUnJoinVisible = true
    },
    // 关闭对话框
    dialogCloseFn() {
      this.$refs.addStuRef.resetFields()
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
  }
};
</script>

<style lang="less" scoped>
  * {
    box-sizing: border-box;
  }
  .header {
    display: flex;
    width: 1200px;
    height: 50px;
    margin: 4px 0;
    align-items: center;
    border-radius: 4px;
    background-color: #fff;
    padding-left: 20px;
  }
  .addClassBtn {
    margin: 10px 0;
  }
  .el-table {
    margin: 0 0 40px;
  }
  .footer {
    display: flex;
    position: fixed;
    bottom: 0;
    z-index: 1;
    width: 1200px;
    height: 40px;
    align-items: center;
    background-color: #fff;
    border-radius: 4px;
    margin-top: 4px;
  }
</style>