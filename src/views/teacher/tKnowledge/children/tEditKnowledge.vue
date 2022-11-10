<template>
  <div class="edit">
    <el-form ref="form" :model="form" label-width="100px">

      <el-form-item label="题目名称:" prop="question_name">
        <el-input v-model="pointDetail.name"></el-input>
      </el-form-item>

      <el-form-item label="难度" prop="level">
        <el-select placeholder="难度" :value="questionLevel(pointDetail.level)">
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="知识点内容:" prop="context">
        <el-input type="textarea" :rows="30" v-model="pointDetail.context" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancelHandleClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { questionLevel } from '@/utils/questLevel';


export default {
  data() {
    return {
      questionLevel,
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
  },
  computed: {
    pointDetail: function () {
      return this.$store.state.tKnowledge.pointDetail
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}
</style>