<template>
  <div class="tClass">   
    <template v-if="!$route.meta.isChildren">
      <div class="header">
        <el-button type="primary" id="addClassBtn" size="small" class="addClassBtn" @click="addClassShowDialogBtn">创建班级</el-button>
      </div>
      <!-- 班级列表 -->
      <el-table :data="$store.state.tClass.classList"
        border
        style="width: 100%">
        <el-table-column type="index" label="序号" width="80px"></el-table-column>
        <el-table-column prop="name" label="班级名" width="240px"></el-table-column>
        <el-table-column prop="college" label="学院名"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column label="操作" width="260px">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click.stop="checkClassInfoFn(scope.row)">学生配置</el-button>
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
        width="36%"
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
    </template>
    
    <router-view></router-view>
  </div>
</template>

<script >
import { addClassAPI, deleteClassAPI, modifyClassAPI, addStudentAPI } from '@/services/modules/teacher/tClass.js'
import { mapActions} from 'vuex';
export default {
  data() {
    const sameClsName = (rules, value, callback) => {  
      try {
        this.$store.state.tClass.classList.forEach(item => {
          if (item.name == value) {
            throw new Error("class-name-error")
          }
        })
        callback()
      } catch (e) {
        if (e.message == "class-name-error") {
          this.$message({
            message: '该班级已存在，请重新输入',
            type: "warning"
          })
          return false
        }
      }
    }
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
          { required: true, message: "请输入班级名", trigger: 'blur' },
          { validator: sameClsName, trigger: "blur"}
        ],
        college: [
          {required: true, message: "请输入学院名", trigger: "blur"}
        ],
        major: [
          {required: true, message: "请输入专业名", trigger: "blur"}
        ]
      },
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
            if (res.code === 0) {
              this.$message.success(res.msg)
            }
          } else {  // 修改班级信息
            const res = await modifyClassAPI({ class_id: this.editClassId, ...this.addClassForm })
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
      this.$confirm('是否删除' + obj.name + '？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteClassAPI(obj.class_id)
        if (res.code === 0) {
          // this.$message.success(res.msg)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        }
        if (this.$store.state.tClass.classList.length === 1) {
          if (this.$store.state.tClass.classPage.page_num > 1) {
            this.$store.state.tClass.classPage.page_num --
          }
        }
        this.getClassInfoActions()
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
      })
      
    },
    // 修改班级信息
    modifyClassFn(obj) {
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
      // this.getClassInfoActions(this.$store.state.tClass.classPage)
      this.getClassInfoActions()
    },
    // 当前页码改变时触发
    handleCurrentChange(nowPage) {
      this.$store.state.tClass.classPage.page_num = nowPage
      // this.getClassInfoActions(this.$store.state.tClass.classPage)
      this.getClassInfoActions()
    },
   /*  clsNameCheck() {
      try {
        this.$store.state.tClass.classList.forEach(item => {
          if (item.name == this.addClassForm.name) {
            throw new Error("class-name-error")
          }
        })
        return true
      } catch (e) {
        if (e.message == "class-name-error") {
          this.$message({
            message: '该班级已存在，请重新输入',
            type: "warning"
          })
          return false
        }
      }
    } */
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
  div.el-input {
    width: 350px;
  }
</style>