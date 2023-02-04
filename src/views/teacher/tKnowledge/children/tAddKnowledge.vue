<template>
  <div class="add">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="知识点名称:" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="难度" prop="level">
        <el-select v-model="form.level" placeholder="难度">
          <el-option
            v-for="item in levelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="知识点内容:" prop="context">
        <el-input type="textarea" :rows="24" v-model="form.context" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancelHandleClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelOptions: this.$store.state.levelOptions,
      form: {
        name: '',
        level: '',
        context: ''
      },
      rules: {
        name: [{ required: true, message: '请输入题目名称' }],
        context: [{ required: true, message: '请输入题目内容' }],
        level: [{ required: true, message: '请选择难度' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('PointAddActive', {
              ...this.form,
              parent_knp_id: this.$route.params.id
            })
            .then((res) => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.$router.push({ path: '/teacher/knowledge/tree' })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelHandleClick() {
      this.$router.push({ path: '/teacher/knowledge/tree' })
    }
  }
}
</script>

<style lang="less" scoped>
.add {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}
</style>
