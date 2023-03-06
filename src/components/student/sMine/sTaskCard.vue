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
        <div class="option option-answer" v-if="problem.type === 5">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 300px; overflow-y: hidden"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
            @onChange="onChange"
          />
          <!-- {{ editor?.getHtml() }} -->
          <br />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { toSelect } from '@/utils/transfrom'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

export default {
  name: 'taskCard',
  data() {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default',

      currentView: '',
      typeArr: ['单选', '多选', '判断', '填空', '简答'],
      typeComponent: ['Radio', 'Multi', 'Judge', 'Fill', 'Answer'],

      // 单选默认选项
      radio: 'A',

      // 多选默认项
      checkList: [],

      // 判断默认项
      judge: 'A',

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


    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onChange(editor) {
      console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
    }
  },
  computed: {
  },
  components: {
    Radio: () => import('@/components/teacher/Test/tQuestion/tRadio.vue'),
    Multi: () => import('@/components/teacher/Test/tQuestion/tMulti.vue'),
    Judge: () => import('@/components/teacher/Test/tQuestion/tJudge.vue'),
    Fill: () => import('@/components/teacher/Test/tQuestion/tFill.vue'),
    Answer: () => import('@/components/teacher/Test/tQuestion/tAnswer.vue'),
    Editor,
    Toolbar
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style scoped lang="less">
.task-card {
  min-height: 150px;
  border-bottom: 0.5px dashed gray ;
  margin: 35px 0;
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

  .option-answer{
    min-height: 300px;
  }
}
</style>