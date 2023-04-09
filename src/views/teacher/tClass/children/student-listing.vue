<template>
  <div class="tClass">
    <template v-if="!$route.meta.isChildren">
      <div class="header">
        <el-input v-model="keyword" placeholder="请输入学生姓名" class="search-bar"></el-input>
        <!-- <el-button type="primary" size="small" @click="searchStuFn">查询</el-button> -->
        <el-button type="primary" size="small" @click="resetFn">重置</el-button>
        <el-button type="primary" size="small" class="addStuBtn" @click="addStudentFn">新增学生</el-button>
      </div>

      <!-- 未加入班级学生列表 -->
      <el-table :data="$store.state.tClass.unJoinClassList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80px"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="student_no" label="学号"></el-table-column>
        <el-table-column prop="college" label="学院"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="phone_number" label="联系电话"></el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="modifyStuInfoFn(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteStuFn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="footer">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="$store.state.tClass.unJoinStuPage.page_num" :page-sizes="[10, 20, 30]"
          :page-size="$store.state.tClass.unJoinStuPage.page_size" layout="total, sizes, prev, pager, next, jumper"
          :total="+this.$store.state.tClass.unJoinStuTotal">
        </el-pagination>
      </div>


      <!-- 新增学生对话框 -->
      <el-dialog title="新增学生" :visible.sync="dialogVisible" width="40%" @close="stuDialogCloseFn">
        <el-form :model="addStuForm" ref="addStuRef" label-width="90px" :rules="addStuRules">
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="addStuForm.name" minlength="1"></el-input>
          </el-form-item>
          <el-form-item label="学号:" prop="student_no">
            <el-input v-model="addStuForm.student_no" minlength="1"></el-input>
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
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addConfirmFn">保存</el-button>
        </div>
      </el-dialog>

      <!-- 修改学生对话框 -->
      <el-dialog title="修改学生" :visible.sync="modifydialogVisible" width="40%" @close="stuDialogCloseFn">
        <el-form :model="modifyStuForm" ref="addStuRef" label-width="90px" :rules="addStuRules">
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="modifyStuForm.name" minlength="1"></el-input>
          </el-form-item>
          <el-form-item label="学号:" prop="student_no">
            <el-input v-model="modifyStuForm.student_no" minlength="1"></el-input>
          </el-form-item>
          <el-form-item label="学院:" prop="college">
            <el-input v-model="modifyStuForm.college" minlength="1"></el-input>
          </el-form-item>
          <el-form-item label="专业:" prop="major">
            <el-input v-model="modifyStuForm.major" minlength="1"></el-input>
          </el-form-item>
          <el-form-item label="电话号码:" prop="phone_number">
            <el-input v-model="modifyStuForm.phone_number" minlength="1"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modifydialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleInputChange">保存</el-button>
        </div>
      </el-dialog>

    </template>

    <router-view></router-view>
  </div>
</template>

<script >
import { addStudentAPI, deleteUnJoinStuAPI, modifyStudentAPI } from '@/services/modules/teacher/tClass.js'
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      keyword: "",
      dialogVisible: false,  // 新增学生对话框是否显示
      modifydialogVisible: false,
      addStuForm: {  // 未加入班级学生的信息
        name: "",
        student_no: "",
        college: "",
        major: "",
        phone_number: ""
      },
      modifyStuForm: {  // 待修改学生的信息
        name: "",
        student_no: "",
        college: "",
        major: "",
        phone_number: ""
      },
      editStudentId: '', // 保存学生编号
      // 新增学生表单验证规则
      addStuRules: {
        name: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          { pattern: /^[\u4E00-\u9FA5]+$/, message: "学生姓名必须为中文字符", trigger: "blur" },
          { min: 2, message: "学生姓名至少需要两个字", trigger: "blur" }
        ],

        student_no: [
          { required: true, message: "请输入学生学号", trigger: "blur" },
          { pattern: /^\d{12}$/, message: "学号必须是12位数字", trigger: "blur" }
        ],
        college: [
          { required: true, message: "请输入学院名", trigger: "blur" }
        ],
        major: [
          { required: true, message: "请输入专业名", trigger: "blur" }
        ],

        phone_number: [
          { required: true, message: "请输入学生电话号码", trigger: "blur" },
          { pattern: /^1([3456789])\d{9}$/, message: "电话号码格式不正确", trigger: "blur" }
        ]

      },
      isEdit: false, // true为编辑状态，false为新增状态
    }
  },
  mounted() {
    this.getUnJoinClsStuActions()
  },
  watch: {
    keyword(val) {
      this.$store.state.tClass.content = val;
      this.$store.state.tClass.unJoinStuPage.page_num = 1;
      this.getUnJoinClsStuActions({
        content: val,
        page_num: this.$store.state.tClass.unJoinStuPage.page_num,
        page_size: this.$store.state.tClass.unJoinStuPage.page_size,
      })
    }

  },
  methods: {
    // 查询未加入班级学生列表
    ...mapActions(['getUnJoinClsStuActions']),
    // resetFn() {
    //   this.keyword = ""
    // },

    resetFn() {
      this.$store.state.tClass.content = "";
      this.$store.state.tClass.unJoinStuPage.page_num = 1;
      this.getUnJoinClsStuActions()
    },

    // 取消对话框
    cancelFn() {
      this.dialogVisible = false
    },
    // 分页->每页条数改变触发
    handleSizeChange(sizes) {
      this.$store.state.tClass.unJoinStuPage.page_size = sizes
      this.$store.state.tClass.unJoinStuPage.page_num = 1
      this.getUnJoinClsStuActions()
    },
    // 当前页码改变时触发
    handleCurrentChange(nowPage) {
      this.$store.state.tClass.unJoinStuPage.page_num = nowPage
      this.getUnJoinClsStuActions()
    },
    // 点击新增学生按钮
    addStudentFn() {
      this.isEdit = false
      this.dialogVisible = true
    },
    // 关闭对话框
    stuDialogCloseFn() {
      this.$refs.addStuRef.resetFields()
    },

    //新增学生 / 修改学生信息后保存
    addConfirmFn() {
      this.$refs.addStuRef.validate(async valid => {
        if (valid) {
          if (!this.isEdit) {  // 新增学生
            const res = await addStudentAPI(this.addStuForm)
            console.log(res)
            if (res.code === 0) {
              this.$message.success(res.msg)
            }
          }
          this.getUnJoinClsStuActions()
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },

    handleInputChange() {
      // 更新 modifyStuForm
      this.modifyStuForm = { ...this.modifyStuForm };
      this.$refs.addStuRef.validate(async valid => {
        if (valid) {
          // 修改学生信息
          const params = {
            name: this.modifyStuForm.name,
            student_no: this.modifyStuForm.student_no,
            college: this.modifyStuForm.college,
            major: this.modifyStuForm.major,
            phone_number: this.modifyStuForm.phone_number,
            student_id: this.editStudentId,
          }
          const res = await modifyStudentAPI(params);
          if (res.code === 0) {
            this.$message.success("修改成功")
            // 更新表格数据
            this.getUnJoinClsStuActions()
            // 隐藏修改弹窗
            this.modifydialogVisible = false
          }
        } else {
          return false
        }
      })
    },

    // 修改学生信息
    modifyStuInfoFn(obj) {
      this.modifydialogVisible = true
      this.isEdit = true
      this.editStudentId = obj.student_id
      this.modifyStuForm = {
        student_no: obj.student_no,
        name: obj.name,
        college: obj.college,
        major: obj.major,
        phone_number: obj.phone_number
      }
    },


    // 删除学生
    deleteStuFn(obj) {
      this.$confirm("是否删除" + obj.name + "？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // console.log("删除学生")
        const res = await deleteUnJoinStuAPI(obj.student_id)
        console.log(res)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        }

        if (this.$store.state.tClass.unJoinClassList.length === 1) {
          if (this.$store.state.tClass.unJoinStuPage.page_num > 1) {
            this.$store.state.tClass.unJoinStuPage.page_num--
          }
        }
        this.getUnJoinClsStuActions()
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },
    // 搜索学生
    /* searchStuFn() {
      this.$store.state.tClass.unJoinClassList = this.$store.state.tClass.unJoinClassList.filter(stu => {
        return stu.name.indexOf(this.keyword) !== -1
      })
      this.$store.state.tClass.unJoinStuTotal = this.$store.state.tClass.unJoinClassList.length
      this.$store.state.tClass.unJoinStuPage.page_num = 1
      this.$store.state.tClass.unJoinStuPage.page_size = 20
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

  .search-bar {
    width: 300px;
    margin-right: 10px;
  }
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