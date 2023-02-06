<!-- 不要了 -->
<template>
  <div class="select">
    <el-form ref="form" :model="editForm" :rules="rules" label-width="100px">
      <!-- 题型 -->
      <el-form-item label="题型:">
        {{ questionType(form.type) }}
      </el-form-item>

      <!-- 题目名称 -->
      <el-form-item label="题目名称:" prop="question_name">
        <el-input type="textarea" v-model="form.question_name" />
      </el-form-item>

      <!-- 题干 -->
      <el-form-item label="题干:" prop="context">
        <el-input type="textarea" :rows="4" v-model="form.context" />
      </el-form-item>

      <!-- 选项 -->
      <template
        v-if="(form.type == 1 || form.type == 2) && form.question_option_list"
      >
        <el-form-item label="选项:"> </el-form-item>
        <el-form-item
          label="A"
          prop="question_option_list[0].Context"
          :rules="[{ required: true, message: '选项不能为空' }]"
        >
          <el-input v-model="form.question_option_list[0].Context" />
        </el-form-item>
        <el-form-item
          label="B"
          prop="question_option_list[1].Context"
          :rules="[{ required: true, message: '选项不能为空' }]"
        >
          <el-input v-model="form.question_option_list[1].Context" />
        </el-form-item>
        <el-form-item
          label="C"
          prop="question_option_list[2].Context"
          :rules="[{ required: true, message: '选项不能为空' }]"
        >
          <el-input v-model="form.question_option_list[2].Context" />
        </el-form-item>
        <el-form-item
          label="D"
          prop="question_option_list[3].Context"
          :rules="[{ required: true, message: '选项不能为空' }]"
        >
          <el-input v-model="form.question_option_list[3].Context" />
        </el-form-item>
      </template>

      <!-- 解析 -->
      <el-form-item label="答案解析:" prop="answer">
        <el-input type="textarea" :rows="4" v-model="editForm.answer" />
      </el-form-item>

      <!-- 联系 -->
      <el-form-item label="知识点联系:" label-width="100px">
        <tTree
          :operation="false"
          @checkedClick="checkedClick"
          :show-checkbox="true"
          :defaultChecked="editForm.knp_id"
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
</template>

<script>
import { questionType } from '@/utils/questionType'
import { questionLevel } from '@/utils/questLevel'
import tTree from '../knowledge/tTree.vue'

export default {
  components: { tTree },
  props: {
    typeValue: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      questionType,
      questionLevel,
      levelOptions: this.$store.state.levelOptions,
      form: undefined,
      rules: {
        question_name: [{ required: true, message: '请输入题目名称' }],
        context: [{ required: true, message: '请输入题目内容' }],
        answer: [{ required: true, message: '请输入答案解析' }],
        level: [{ required: true, message: '请选择难度' }]
      }
    }
  },
  computed: {
    editForm() {
      // const form = {
      //   question_id: '',
      //   question_name: '',
      //   type: 1,
      //   level: '',
      //   create_user: '',
      //   question_option_list: [
      //     { Context: '' },
      //     { Context: '' },
      //     { Context: '' },
      //     { Context: '' }
      //   ],
      //   answer: '',
      //   context: '',
      //   knp_id: []
      // }

      // if (this.$store.state.tTopic.currentTopicEditData) {
      //   const data = this.$store.state.tTopic.currentTopicEditData
      //   form.question_id = data.problem_info?.question_id
      //   form.question_name = data.problem_info?.name
      //   form.type = data.problem_info?.type
      //   form.level = data.problem_info?.level
      //   form.create_user = data.problem_info?.create_user
      //   form.answer = data.problem_info?.answer
      //   if (data.question_option) {
      //     for (let i = 0; i < form.question_option_list.length; i++) {
      //       form.question_option_list[i].Context =
      //         data.question_option[i]?.Context
      //     }
      //   }
      //   form.context = data.problem_info?.context

      //   if (data.knowledge_point_question_list) {
      //     for (const item of data.knowledge_point_question_list) {
      //       item.knp_id ? form.knp_id.push(item.knp_id) : ''
      //     }
      //   }
      // }

      console.log(this.$store.state.tTopic.currentTopicEditData, 'store')

      this.form = { ...this.$store.state.tTopic.currentTopicEditData }
      console.log(this.form, 'form')
      return this.form
    }
  },
  mounted() {
    this.$store.dispatch('QuestionByIdActive', this.$route.params.id)
  },
  methods: {
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
    cancelHandleClick() {
      this.$router.push({ path: '/teacher/topic' })
    },
    checkedClick(data, checked) {
      this.form.knp_id = data
    }
  }
}
</script>

<style lang="less" scoped></style>
