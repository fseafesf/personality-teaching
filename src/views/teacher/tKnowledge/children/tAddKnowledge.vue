<template>
  <div class="add">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">

      <el-form-item label="题目名称:" prop="question_name">
        <el-input v-model="form.question_name"></el-input>
      </el-form-item>

      <el-form-item label="难度" prop="level">
        <el-select placeholder="难度">
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="知识点内容:" prop="context">
        <el-input type="textarea" :rows="24" />
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
      }

    }
  },
  methods: {
    onSubmit() {

    },
    cancelHandleClick() {
      this.$router.push({ path: '/teacher/knowledge/tree' })
    },
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