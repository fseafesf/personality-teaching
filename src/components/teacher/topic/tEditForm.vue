<template>
  <div class="select">
    <el-form ref="form" :model="editForm" label-width="80px">
      <el-form-item label="题型:">
        {{ questionType(editForm.problem_info?.type) }}
      </el-form-item>

      <el-form-item label="题干:">
        <el-input type="textarea" :value="editForm.problem_info?.context" />
      </el-form-item>

      <template
        v-if="(editForm.problem_info?.type == 1 || editForm.problem_info?.type == 2) && editForm.question_option">
        <el-form-item label="选项:">
        </el-form-item>
        <el-form-item label="A">
          <el-input :value="editForm.question_option[0]?.Context" />
        </el-form-item>
        <el-form-item label="B">
          <el-input :value="editForm.question_option[1]?.Context" />
        </el-form-item>
        <el-form-item label="C">
          <el-input :value="editForm.question_option[2]?.Context" />
        </el-form-item>
        <el-form-item label="D">
          <el-input :value="editForm.question_option[3]?.Context" />
        </el-form-item>
      </template>

      <el-form-item label="答案解析:">
        <el-input type="textarea" :value="editForm.problem_info?.answer" />
      </el-form-item>
      <el-form-item label="知识点联系:" label-width="100px">
        <Tree :operation="false" :show-checkbox="true"
          :defaultChecked="editForm.knowledge_point_question_list[0]?.knp_id" />
      </el-form-item>
      <el-form-item label="难度">
        <el-select placeholder="难度" :value="questionLevel(editForm.problem_info?.level)">
          <el-option v-for="item in difficultyOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cancelHandleClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { questionType } from '@/utils/questionType';
import { questionLevel } from '@/utils/questLevel';
import Tree from '../knowledge/tree.vue';

export default {
  components: { Tree },
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
      difficultyOptions: [{
        value: '1',
        label: '简单'
      },
      {
        value: '2',
        label: '中等'
      },
      {
        value: '3',
        label: '困难'
      }
      ],
      // form: {
      //   type: '选择题',
      //   content: '',
      //   A: '',
      //   B: '',
      //   C: '',
      //   D: '',
      //   analysis: '',
      //   difficultyValue: ''
      // }
    }
  },
  computed: {
    editForm() {
      return this.$store.state.tTopic.currentTopicEditData
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      this.$router.push({ path: '/teacher/topic' })
    },
    cancelHandleClick() {
      this.$router.push({ path: '/teacher/topic' })
    }
  }
}
</script>

<style lang="less" scoped>

</style>