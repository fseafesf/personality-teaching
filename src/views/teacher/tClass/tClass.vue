<template>
  <div>   
    <template v-if="!$route.meta.isChildren">
      <!-- 搜索区 -->
      <div class="header">
        <el-input placeholder="请输入班级信息" class="searchInput"></el-input>
        <el-button type="primary" id="searchClassBtn" size="small">查询班级</el-button>
        <el-button type="primary" id="addClassBtn" size="small" @click="addClassShowDialogBtn">创建班级</el-button>
      </div>

      <!-- 班级列表 -->
      <el-table :data="classList"
        border
        style="width: 100%"
        stripe>
        <el-table-column type="index" label="序号" width="80px"></el-table-column>
        <el-table-column prop="name" label="班级名" width="140"></el-table-column>
        <el-table-column prop="college" label="学院名"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column label="操作" width="240px">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="checkClassInfoFn">查看</el-button>
            <el-button type="primary" size="mini" @click="modifyClassFn(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="delClassBtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增 / 修改班级对话框 -->
      <el-dialog
        title="班级信息"
        :visible.sync="dialogVisible"
        width="40%"
        @close="dialogCloseFn">
        <el-form :model="addClassForm" ref="addClassRef" label-width="100px">
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
import { getClassAPI, addClassAPI, deleteClassAPI, modifyClassAPI } from '@/services/modules/teacher/tClass.js'
export default {
  data() {
    return {
      classList: [],
      dialogVisible: false,
      // 添加班级的数据对象
      addClassForm: {
        name: '',
        college: '',
        major: ''
      },
      pn: 1,  // 分页页号
      isEdit: false, // true为编辑状态，false为新增状态
      editClassId: '' // 保存班级编号
    }
  },
  created() {
    this.getClassListFn()
  },
  methods: {
    // 获取班级列表
    async getClassListFn() {
      const res = await getClassAPI(this.pn)
      // console.log(res)
      this.classList = res.data
    },
    // 关闭对话框
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
    // 保存班级信息
    async confirmFn() {
      if (!this.isEdit) {  /// 创建班级
        const res = await addClassAPI(this.addClassForm)
        // console.log(res)
        if (res.code !== 0) return this.$message.error(res.msg)
        this.$message.success(res.msg)
      } else {  // 修改班级信息
        const res = await modifyClassAPI({ class_id: this.editClassId, ...this.addClassForm })
        console.log(res)
        // if (res.code !== 0) return this.$message.error(res.msg)
        // this.$message.success(res.msg)
      }
      this.getClassListFn()
      this.dialogVisible = false
    },
    // 查看班级信息
    checkClassInfoFn() {
      this.$router.push('/teacher/class/classInfo')
    },
    // 删除班级
    async delClassBtn(obj) {
      // console.log(obj)
      const res = await deleteClassAPI(obj.class_id)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getClassListFn()
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
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  margin: 10px 0;
  height: 80px;
  align-items: center;
  border-radius: 4px;
  background-color: #fff;
  padding-left: 20px;
  .searchInput {
    width: 300px;
    margin-right: 10px;
  }
}
</style>