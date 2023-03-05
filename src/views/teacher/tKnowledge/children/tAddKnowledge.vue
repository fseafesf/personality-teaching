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
        <!-- 富文本编辑器 -->
        <PtEditor v-model="form.context" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancelHandleClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PtEditor from '@/components/common/PtEditor.vue'

export default {
  components: { PtEditor },
  data() {
    return {
      levelOptions: this.$store.state.levelOptions,
      form: {
        name: '',
        level: '',
        context: ''
      },
      // 验证规则
      rules: {
        name: [
          { required: true, max: 30, message: '请输入30字以内的知识点名称' }
        ],
        context: [{ required: true, message: '请输入知识点内容' }],
        level: [{ required: true, message: '请选择难度' }]
      }
    }
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果是添加一级知识点 parent_knp_id为它本身 不需要要传
          if (this.$route.params.id === '1') {
            // 一级知识点 不需要 parent_knp_id 为它本身
            this.$store
              .dispatch('PointAddActive', {
                ...this.form
              })
              .then((res) => {
                if (res?.code == 0) {
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  })
                  this.$router.push({ path: '/teacher/knowledge/tree' })
                }
              })
          } else {
            // 子知识点 需要parent_knp_id
            this.$store
              .dispatch('PointAddActive', {
                ...this.form,
                parent_knp_id: this.$route.params.id
              })
              .then((res) => {
                console.log(res, 'res')
                if (res?.code == 0) {
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  })
                  this.$router.push({ path: '/teacher/knowledge/tree' })
                }
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 取消
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
