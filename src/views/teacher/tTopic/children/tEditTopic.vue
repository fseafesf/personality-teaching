<template>
  <div class="edit-topic">
    <div class="select">
      <el-form ref="form" :model="editForm" :rules="rules" label-width="100px">
        <!-- 题型 -->
        <el-form-item label="题型:">
          {{ questionType(form.type) }}
        </el-form-item>

        <!-- 题目名称 -->
        <el-form-item label="题目名称:" prop="name">
          <el-input type="textarea" v-model="form.name" />
        </el-form-item>

        <!-- 题干 -->
        <el-form-item label="题干:" prop="context">
          <el-input type="textarea" :rows="4" v-model="form.context" />
        </el-form-item>

        <!-- 选项 -->
        <template
          v-if="(form.type == 1 || form.type == 2) && form.question_option"
        >
          <el-form-item label="选项:"> </el-form-item>
          <el-form-item
            v-for="(item, index) in form.question_option"
            :label="mapABCDEF(index)"
            :prop="getOptionProps(index)"
            :rules="[{ required: true, message: '选项不能为空' }]"
          >
            <el-input v-model="form.question_option[index].Context"></el-input>
          </el-form-item>

          <!-- 添加/删除选项 -->
          <el-form-item>
            <el-button type="primary" plain @click="handleAddOption"
              >添加选项</el-button
            >
            <el-button type="danger" plain @click="handleDeleteOption"
              >删除选项</el-button
            >
          </el-form-item>
        </template>

        <!-- 解析 -->
        <el-form-item label="答案解析:" prop="answer">
          <el-input type="textarea" :rows="4" v-model="editForm.answer" />
        </el-form-item>

        <!-- 知识点联系 -->
        <el-form-item label="知识点联系:" label-width="100px">
          <tTree
            :operation="false"
            @checkedClick="checkedClick"
            :show-checkbox="true"
            :defaultChecked="editForm.knp_ids"
          />
        </el-form-item>

        <!-- 难度 -->
        <el-form-item label="难度" prop="level">
          <el-select
            v-model="form.level"
            placeholder="难度"
            :value="questionLevel(form.level)"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 保存 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="cancelHandleClick">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { questionType } from '@/utils/questionType'
import { questionLevel } from '@/utils/questLevel'
import tTree from '@/components/teacher/knowledge/tTree.vue'

import mapABCDEF from '@/utils/mapABCDEF'

export default {
  components: { tTree },
  data() {
    return {
      questionType,
      questionLevel,
      levelOptions: this.$store.state.levelOptions,
      form: undefined,
      rules: {
        name: [{ required: true, message: '请输入题目名称' }],
        context: [{ required: true, message: '请输入题目内容' }],
        answer: [{ required: true, message: '请输入答案解析' }],
        level: [{ required: true, message: '请选择难度' }]
      },

      mapABCDEF // 映射ABCDEF工具函数
    }
  },
  mounted() {
    this.$store.dispatch('QuestionByIdActive', this.$route.params.id)
  },
  methods: {
    // 返回给选项ABCD的props的字符串 用来做验证参数是否合理
    getOptionProps(index) {
      return `question_option[${index}].Context`
    },

    // 添加选项
    handleAddOption() {
      this.form.question_option.push({
        Context: ''
      })
    },

    // 删除选项
    handleDeleteOption() {
      this.form.question_option.pop()
    },

    // 提交
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('QuestionUpdataActive', this.form)
            .then((res) => {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.$router.push({ path: '/teacher/topic' })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 取消
    cancelHandleClick() {
      this.$router.push({ path: '/teacher/topic' })
    },

    // 勾选
    checkedClick(data, checked) {
      this.form.knp_id = data
    }
  },
  computed: {
    editForm() {
      console.log(this.$store.state.tTopic.currentTopicEditData, 'store')

      // 获取知识点联系的id
      let knp_ids = []
      if (this.$store.state.tTopic.currentTopicEditData) {
        const data = this.$store.state.tTopic.currentTopicEditData

        if (data.knowledge_point_list) {
          for (const item of data.knowledge_point_list) {
            console.log(item, 'item')
            item.knp_id ? knp_ids.push(item.knp_id) : ''
          }
        }
      }

      this.form = { ...this.$store.state.tTopic.currentTopicEditData, knp_ids }
      console.log(this.form, 'form')
      return this.form
    }
  }
}
</script>

<style lang="less" scoped>
.edit-topic {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}
</style>
