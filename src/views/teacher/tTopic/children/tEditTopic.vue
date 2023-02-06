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

        <!-- 答案
        <el-form-item label="答案:" prop="answer">
          <el-input type="textarea" :rows="4" v-model="editForm.answer" />
        </el-form-item> -->

        <!-- 答案 -->
        <template>
          <!-- 选择题 -->
          <template v-if="form.type == 1 || form.type == 2">
            <el-form-item label="答案:" prop="answer">
              <el-input
                type="textarea"
                :rows="1"
                v-model="form.answer"
              ></el-input>
            </el-form-item>
          </template>

          <!-- 判断题 -->
          <template v-else-if="form.type == 3">
            <el-form-item label="答案:" prop="answer">
              <el-select v-model="form.answer">
                <el-option
                  v-for="item in judgeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>

          <!-- 填空题 -->
          <template v-else-if="form.type == 4">
            <el-form-item
              v-for="(item, index) in form.answerArr"
              label="答案:"
              :prop="getAnswerProps(index)"
              :rules="[{ required: true, message: '选项不能为空' }]"
            >
              <el-input
                class="tk-input"
                type="textarea"
                :rows="2"
                v-model="form.answerArr[index]"
              ></el-input>
            </el-form-item>

            <!-- 添加/删除答案 -->
            <el-form-item>
              <el-button type="primary" plain @click="handleAddAnswer"
                >添加答案</el-button
              >
              <el-button type="danger" plain @click="handleDeleteAnswer"
                >删除答案</el-button
              >
            </el-form-item>
          </template>
        </template>

        <!-- 解析 -->
        <el-form-item label="解析:">
          <el-input
            type="textarea"
            :rows="4"
            v-model="editForm.answer_context"
          />
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
      levelOptions: this.$store.state.levelOptions, // 映射难度
      judgeOption: [
        // 判断题答案映射
        {
          value: 1,
          label: '对'
        },
        {
          value: 0,
          label: '错'
        }
      ],

      form: undefined, // form表单数据

      // 参数校验
      rules: {
        name: [{ required: true, message: '请输入题目名称' }],
        context: [{ required: true, message: '请输入题目内容' }],
        answer: [{ required: true, message: '请输入答案解析' }],
        level: [{ required: true, message: '请选择难度' }]
      },

      questionType, // 映射题型工具函数
      questionLevel, // 映射难度工具函数
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

    // 删除选项
    handleDeleteOption() {
      this.form.question_option_list.pop()
    },

    // 添加填空题答案输入框
    handleAddAnswer() {
      this.form.answerArr.push('')
    },

    // 删除填空题答案输入框
    handleDeleteAnswer() {
      this.form.answerArr.pop()
    },

    // 返回给填空题答案的props的字符串 用来做验证参数是否合理
    getAnswerProps(index) {
      return `answerArr[${index}]`
    },

    // 提交
    // 请求更新的接口的参数与返回详情接口的字段有些不一致，再server的更新接口进行抽取
    onSubmit() {
      // 收集填空题答案 因为接口只有一个答案参数answer 而填空题可能有多个答案 所以我们通过+拼接成一个答案传递给 answer 如 "填空1+填空2"

      // 1.先把this.form中的answer转为空 再拼接
      this.form.answer = ''
      for (let i = 0; i < this.form.answerArr.length; i++) {
        i === 0
          ? (this.form.answer = this.form.answer + this.form.answerArr[i])
          : (this.form.answer = this.form.answer + '+' + this.form.answerArr[i])
      }

      this.$refs['form'].validate((valid) => {
        if (valid) {
          // console.log(this.form, 'this')
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
          console.log('校验失败!')
          return false
        }
      })
    },

    // 取消
    cancelHandleClick() {
      this.$router.push({ path: '/teacher/topic' })
    },

    // 掉tTree组件emit的勾选知识点方法
    checkedClick(data, checked) {
      // 点击后改为form表单添加knpid字段
      this.form.knp_idStr = data
    }
  },
  computed: {
    // 因为porps不推荐修改 我们可以拷贝一个form来使用
    editForm() {
      // 获取知识点联系的id
      let knp_ids = []

      // 如果是填空题 获取分割后的答案数组
      let answerArr = []

      if (this.$store.state.tTopic.currentTopicEditData) {
        const data = this.$store.state.tTopic.currentTopicEditData

        // 知识点id
        if (data.knowledge_point_list) {
          for (const item of data.knowledge_point_list) {
            item.knp_id ? knp_ids.push(item.knp_id) : ''
          }
        }

        // 如果为填空题 需要对答案answer进行分离转成数组
        // 添加填空题的时候 多个answer用+进行拼接 可以过+分割获取答案数组
        if (data.type === 4) {
          answerArr = data.answer.split('+')
        }
      }

      this.form = {
        ...this.$store.state.tTopic.currentTopicEditData,
        knp_ids,
        answerArr
      }
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
