<template>
  <div class="add-topic">
    <div class="add-content">
      <!-- <tAddForm /> -->
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <!-- 题型 -->
        <el-form-item label="题型: " prop="type">
          <div class="topic-type">
            <el-select
              class="search-item"
              v-model="form.type"
              placeholder="题型"
              @change="typeChangeHandler"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <!-- 题目名称 -->
        <el-form-item label="题目名称:" prop="question_name">
          <el-input v-model="form.question_name"></el-input>
        </el-form-item>

        <!-- 题干 -->
        <el-form-item label="题干:" prop="context">
          <el-input type="textarea" :rows="4" v-model="form.context"></el-input>
        </el-form-item>

        <!-- 选项 -->
        <template v-if="form.type == 1 || form.type == 2">
          <el-form-item label="选项:"> </el-form-item>
          <el-form-item
            v-for="(item, index) in form.question_option_list"
            :label="mapABCDEF(index)"
            :prop="getOptionProps(index)"
            :rules="[{ required: true, message: '选项不能为空' }]"
          >
            <el-input
              v-model="form.question_option_list[index].Context"
            ></el-input>
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

        <!-- 答案 -->
        <template>
          <!-- 单选题 -->
          <template v-if="form.type == 1">
            <el-form-item label="答案:" prop="answer">
              <el-radio-group v-model="form.answer">
                <el-radio
                  v-for="(item, index) in form.question_option_list"
                  :label="mapABCDEF(index)"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
          </template>

          <!-- 多选 -->
          <template v-if="form.type == 2">
            <el-form-item label="答案:" prop="dx_answer">
              <el-checkbox-group v-model="form.dx_answer">
                <el-checkbox
                  v-for="(item, index) in form.question_option_list"
                  :label="mapABCDEF(index)"
                  name="type"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>

          <!-- 判断题 -->
          <template v-else-if="form.type == 3">
            <el-form-item label="答案:" prop="answer">
              <el-radio-group v-model="form.answer">
                <el-radio label="对"></el-radio>
                <el-radio label="错"></el-radio>
              </el-radio-group>
            </el-form-item>
          </template>

          <!-- 填空题 -->
          <template v-else-if="form.type == 4">
            <el-form-item
              v-for="(item, index) in form.tk_answer"
              label="答案:"
              :prop="getAnswerProps(index)"
              :rules="[{ required: true, message: '选项不能为空' }]"
            >
              <el-input
                class="tk-input"
                type="textarea"
                :rows="2"
                v-model="form.tk_answer[index]"
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

          <!-- 简答题 -->
          <template v-else-if="form.type == 5">
            <el-form-item label="答案:" prop="answer">
              <el-input
                class="tk-input"
                type="textarea"
                :rows="5"
                v-model="form.answer"
              ></el-input>
            </el-form-item>
          </template>
        </template>

        <!-- 解析 可选非必须 -->
        <el-form-item label="解析:">
          <el-input
            type="textarea"
            :rows="4"
            v-model="form.answer_context"
          ></el-input>
        </el-form-item>

        <!-- 知识点 -->
        <el-form-item label="知识点联系:">
          <tTree
            class="tree"
            @checkedClick="checkedClick"
            :operation="false"
            :show-checkbox="true"
          />
        </el-form-item>

        <!-- 难度 -->
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

        <!-- 创建 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="cancelHandleClick">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import tTree from '@/components/teacher/knowledge/tTree.vue'
import mapABCDEF from '@/utils/mapABCDEF'
import { arr2string } from '@/utils/topic'

export default {
  components: { tTree },
  data() {
    return {
      typeOptions: this.$store.state.typeOptions, // 题型映射
      levelOptions: this.$store.state.levelOptions, // 难度映射
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

      // 表单数据
      form: {
        question_name: '', // 题目名称
        type: 1, // 题型
        level: '', // 难度
        create_user: '', // 创建者
        question_option_list: [
          // 选项
          { Context: '' },
          { Context: '' },
          { Context: '' },
          { Context: '' }
        ],
        answer: '', // 单选、判断、简答题答案
        dx_answer: [], // 多选题答案
        answer_context: '', // 解析
        context: '', // 题目内容
        knp_id: '', //知识点
        tk_answer: [''] // 填空题答案数组 接口的answer为字符串 但我们有多个答案 可以通过数组转为字符串
      },

      // 规则校验
      rules: {
        type: [{ required: true, message: '请选择题目类型' }],
        question_name: [{ required: true, message: '请输入题目名称' }],
        context: [{ required: true, message: '请输入题目内容' }],
        answer: [{ required: true, message: '请输入答案' }],
        dx_answer: [{ required: true, message: '请选择答案' }],
        level: [{ required: true, message: '请选择难度' }]
      },
      mapABCDEF, // 映射ABCD函数
      arr2string // 将多选题、填空题答案数组转成字符串的工具函数
    }
  },
  methods: {
    // 提交
    onSubmit() {
      // 多选题
      // 多选题答案是一个数组 添加接口只有一个答案参数answer(字符串) 我们需要将数组转成字符串
      if (this.form.type === 2) {
        this.form.answer = '' // 先置为空
        this.form.answer = this.arr2string(this.form.dx_answer)
      }

      // 填空题
      // 收集填空题答案 因为接口只有一个答案参数answer(字符串) 而填空题可能有多个答案[数组] 所以我们通过+拼接成一个答案传递给answer 如 "填空1+填空2"
      if (this.form.type === 4) {
        this.form.answer = '' // 先置为空
        this.form.answer = this.arr2string(this.form.tk_answer)
      }

      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(this.form)

          // 发请求提交
          this.$store.dispatch('QuestionAddActive', this.form).then((res) => {
            this.$message({
              type: 'success',
              message: '创建成功!'
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

    // 勾选知识点
    checkedClick(data, checked) {
      this.form.knp_id = data
    },

    // 修改题型
    typeChangeHandler() {
      // 1.清空表单数据 除题型外
      this.form.question_name = '' // 题目名称
      this.form.level = '' // 难度
      this.form.question_option_list = [
        // 选项
        { Context: '' },
        { Context: '' },
        { Context: '' },
        { Context: '' }
      ]
      this.form.answer = '' // 单选、判断、简答题答案
      this.form.dx_answer = [] // 多选题答案
      this.form.answer_context = '' // 解析
      this.form.context = '' // 题目内容
      this.form.answer_context = '' // 解析
      this.form.knp_id = '' // 知识点
      this.form.tk_answer = [''] // 填空题答案数组 接口的answer为字符串 但我们有多个答案 可以通过数组转为字符串

      // 2.清空校验
      this.$refs['form'].clearValidate()
    },

    // 返回给选项ABCD的props的字符串 用来做验证参数是否合理
    getOptionProps(index) {
      return `question_option_list[${index}].Context`
    },

    // 添加选项
    handleAddOption() {
      this.form.question_option_list.push({
        Context: ''
      })
    },

    // 删除选项
    handleDeleteOption() {
      this.form.question_option_list.pop()
    },

    // 添加填空题答案输入框
    handleAddAnswer() {
      this.form.tk_answer.push('')
    },

    // 删除填空题答案输入框
    handleDeleteAnswer() {
      this.form.tk_answer.pop()
    },

    // 返回给填空题答案的props的字符串 用来做验证参数是否合理
    getAnswerProps(index) {
      return `tk_answer[${index}]`
    }
  }
}
</script>

<style lang="less" scoped>
/* 全局修改tTree组件的的内容超过宽度变成...  */
/deep/ .tree .custom-tree-container .custom-tree-node .label {
  width: 500px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.add-topic {
  .add-content {
    margin-top: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;

    .add-topic {
      .topic-type {
        height: 46px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;

        .type {
          margin-left: 20px;
        }

        .el-select {
          width: 100px;
        }
      }
    }

    .tree {
      // width: 300px;
      border: 1px solid #fff;
    }
  }
}
</style>
