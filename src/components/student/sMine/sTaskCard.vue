<template>
  <div class="task-card">
    <div :is="currentView" :typeProblem="problem" :index="index">
      <template #[currentView]>
        <div class="option" v-if="problem.type === 1">
          <el-radio-group v-model="radio" size="small" @change="handleRadio">
            <div class="option-label" v-for="(item, index) in 4" :key="item">
              <el-radio-button
                style="border-radius: 50% !important"
                :label="toSelect(index)"
              />
              <div class="option-content">{{ item }}</div>
            </div>
          </el-radio-group>
        </div>
        <div class="option" v-if="problem.type === 2">
          <el-checkbox-group v-model="checkList" @change="handleMulti">
            <div class="option-label" v-for="(item, index) in 4" :key="item">
              <el-checkbox :label="toSelect(index)"></el-checkbox>
              <div class="option-content">{{ item }}</div>
            </div>
          </el-checkbox-group>
        </div>
        <div class="option" v-if="problem.type === 3">
          <el-radio-group v-model="judge" size="small" @change="handleJudge">
            <div class="option-label" v-for="(item, index) in 2" :key="item">
              <el-radio-button
                style="border-radius: 50% !important"
                :label="toSelect(index)"
              />
              <div class="option-content">{{ item }}</div>
            </div>
          </el-radio-group>
        </div>
        <div class="option" v-if="problem.type === 5">
          <quillEditor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          >
          </quillEditor>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { toSelect } from '@/utils/transfrom'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'taskCard',
  data() {
    return {
      currentView: '',
      typeArr: ['单选', '多选', '判断', '填空', '简答'],
      typeComponent: ['Radio', 'Multi', 'Judge', 'Fill', 'Answer'],

      // 单选默认选项
      radio: 'A',

      // 多选默认项
      checkList: [],

      // 判断默认项
      judge: 'A',

      content: ``,
      editorOption: {},
      toSelect
    }
  },
  created() {
    this.currentView = this.typeComponent[this.problem.type - 1]
  },
  props: {
    problem: {
      type: Object,
      default: () => ({
        type: 5
      })
    },
    index: {
      type: Number
    }
  },
  methods: {
    handleRadio(value) {
      console.log(value)
    },
    handleMulti(value) {
      console.log(value)
    },
    handleJudge(value) {
      console.log(value)
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {
      console.log(this.content)
    } // 内容改变事件
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  components: {
    Radio: () => import('@/components/teacher/Test/tQuestion/tRadio.vue'),
    Multi: () => import('@/components/teacher/Test/tQuestion/tMulti.vue'),
    Judge: () => import('@/components/teacher/Test/tQuestion/tJudge.vue'),
    Fill: () => import('@/components/teacher/Test/tQuestion/tFill.vue'),
    Answer: () => import('@/components/teacher/Test/tQuestion/tAnswer.vue'),
    quillEditor
  }
}
</script>

<style scoped lang="less">
.task-card {
  min-height: 150px;
  .option {
    margin: 20px;
    .el-radio-group,
    .el-checkbox-group {
      display: flex;
    }
    .option-label {
      margin-left: 50px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      .option-content {
        margin-left: 10px;
      }
    }
  }
}
</style>