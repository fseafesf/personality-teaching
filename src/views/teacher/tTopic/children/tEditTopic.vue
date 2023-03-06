<template>
  <div class="edit-topic">
    <div class="select">
      <el-form ref="form" :model="editForm" :rules="rules" label-width="100px">
        <!-- 题型 -->
        <el-form-item label="题型:">
          {{ questionType(form?.type) }}
        </el-form-item>

        <!-- 题目名称 -->
        <!-- <el-form-item label="题目名称:" prop="name">
          <el-input type="textarea" v-model="form.name" />
        </el-form-item> -->

        <!-- 题干 -->
        <el-form-item label="题干:" prop="context">
          <PtEditor :height="300" v-model="form.context" />
        </el-form-item>

        <!-- 选项 -->
        <template
          v-if="(form?.type == 1 || form?.type == 2) && form.question_option"
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

        <!-- 答案 -->
        <template>
          <!-- 单择题 -->
          <template v-if="form?.type == 1">
            <el-form-item label="答案:" prop="answer">
              <el-radio-group v-model="form.answer">
                <el-radio
                  v-for="(item, index) in form.question_option"
                  :label="mapABCDEF(index)"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
          </template>

          <!-- 多选题 -->
          <template v-if="form?.type == 2">
            <el-form-item label="答案:" prop="answer">
              <el-checkbox-group v-model="form.dx_answer">
                <el-checkbox
                  v-for="(item, index) in form.question_option"
                  :label="mapABCDEF(index)"
                  name="type"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>

          <!-- 判断题 -->
          <template v-else-if="form?.type == 3">
            <el-form-item label="答案:" prop="answer">
              <el-radio-group v-model="form.answer">
                <el-radio label="对"></el-radio>
                <el-radio label="错"></el-radio>
              </el-radio-group>
            </el-form-item>
          </template>

          <!-- 填空题 -->
          <template v-else-if="form?.type == 4">
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
        </template>

        <!-- 解析 -->
        <el-form-item label="解析:">
          <!-- <el-input
            type="textarea"
            :rows="4"
            v-model="editForm.answer_context"
          /> -->
          <PtEditor :height="300" v-model="editForm.answer_context" />
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
import tTree from '@/components/teacher/knowledge/tTree.vue'
import PtEditor from '@/components/common/PtEditor.vue'
import { questionType } from '@/utils/questionType'
import { questionLevel } from '@/utils/questLevel'
import mapABCDEF from '@/utils/mapABCDEF'
import { arr2string } from '@/utils/topic'

export default {
  components: { tTree, PtEditor },
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
        answer: [{ required: true, message: '请输入答案' }],
        level: [{ required: true, message: '请选择难度' }]
      },

      questionType, // 映射题型工具函数
      questionLevel, // 映射难度工具函数
      mapABCDEF, // 映射ABCDEF工具函数
      arr2string // 将多选题、填空题答案数组转成字符串的工具函数
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
      // 获取最后一个选项的值
      let optLen = this.form.question_option.length

      // 判断该选项在答案里是否存在 存在返回下标 不存在返回-1
      let index = this.form.dx_answer.indexOf(mapABCDEF(optLen - 1))
      if (index !== -1) {
        // 最后一项为答案
        return this.$confirm('该选项已被选中，您确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 发请求删除答案 需要将答案从多选框数组去掉 再重新组成答案answer进行修改
            // 删除输入框 放在前面 不然有bug
            this.form.question_option.pop()
            // 删除答案
            this.form.dx_answer.splice(index, 1)
            this.form.answer = ''
            this.form.answer = this.arr2string(this.form.dx_answer)
            this.$store
              .dispatch('QuestionUpdataActive', this.form)
              .then((res) => {
                // 删除答案成功后

                // 重新请求更新页面
                this.$store.dispatch(
                  'QuestionByIdActive',
                  this.$route.params.id
                )
              })
          })
          .catch(() => {})
      } else {
        // 如果最后一项没勾选为答案 直接删除
        this.form.question_option.pop()
      }
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
    },

    // 提交
    // 请求更新的接口的参数与返回详情接口的字段有些不一致，再server的更新接口进行抽取
    onSubmit() {
      // 收集填空题、选择题答案 因为接口只有一个答案参数answer 而多选题、填空题可能有多个答案的数组 所以我们通过+拼接成一个答案传递给 answer 如 "填空1+填空2"

      // 先把this.form中的answer转为空 再拼接
      if (this.form.type === 2) {
        this.form.answer = ''
        this.form.answer = this.arr2string(this.form.dx_answer)
      } else if (this.form.type === 4) {
        this.form.answer = ''
        this.form.answer = this.arr2string(this.form.tk_answer)
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

      // 如果是填空题和多选题 获取分割后的答案数组
      let tk_answer = []
      let dx_answer = []

      if (this.$store.state.tTopic.currentTopicEditData) {
        const data = this.$store.state.tTopic.currentTopicEditData

        // 知识点id
        if (data.knowledge_point_list) {
          for (const item of data.knowledge_point_list) {
            item.knp_id ? knp_ids.push(item.knp_id) : ''
          }
        }

        // 多选题与填空题答案需要的是一个数组展示
        // 如果为多选题、填空题 需要对答案answer进行分离转成数组
        // 添加填空题的时候 多个answer用+进行拼接 可以过+分割获取答案数组
        if (data.type === 2) {
          // 多选
          dx_answer = data.answer.split('+')
        } else if (data.type === 4) {
          // 填空
          tk_answer = data.answer.split('+')
        }
      }

      this.form = {
        ...this.$store.state.tTopic.currentTopicEditData,
        knp_ids,
        tk_answer,
        dx_answer
      }
      // console.log(this.form, 'form')
      return this.form
    }
  }
}
</script>

<style lang="less" scoped>
/* 全局修改tTree组件的的内容超过500px宽度变成...  */
/deep/ .tree .custom-tree-container .custom-tree-node .label {
  width: 500px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.edit-topic {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}
</style>
