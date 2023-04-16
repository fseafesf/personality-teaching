<template>
  <div class="task-card">
    <div :is="currentView" :typeProblem="problem" :index="index">
      <template #[currentView]>
        <div class="option" v-if="problem.type === 1">
          <el-radio-group v-model="radio" size="small" @change="handleRadio">
            <div
              class="option-label"
              v-for="(item, index) in problem.question_option_list"
              :key="index"
            >
              <el-radio-button
                style="border-radius: 50% !important"
                :label="toSelect(index)"
              />
              <div class="option-content">{{ item.Context }}</div>
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
        <div class="option" v-if="problem.type === 4">
          <div
            class="fill-item"
            v-for="(item, index) in spaceNumbers"
            :key="index"
          >
            <span>第{{ index + 1 }}空:</span>
            <el-input
              v-model="fillAnswers[index]"
              placeholder="请输入内容"
              @change="fillChange(index)"
            ></el-input>
          </div>
        </div>
        <div class="option option-answer" v-if="problem.type === 5">
          <PtEditor :height="300" v-model="content" @change="onChange" />
          <!-- {{ editor?.getHtml() }} -->
          <br />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { toSelect, toType } from '@/utils/transfrom'
import PtEditor from '@/components/common/PtEditor.vue'
import '@wangeditor/editor/dist/css/style.css'
import _ from 'lodash'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'

export default {
  name: 'taskCard',
  data() {
    return {
      content: '', // 用来双向绑定富文本内容

      currentView: '',
      typeArr: ['单选', '多选', '判断', '填空', '简答'],
      typeComponent: ['Radio', 'Multi', 'Judge', 'Fill', 'Answer'],

      // 单选默认选项
      radio: '',

      // 多选默认项
      checkList: [],

      // 判断默认项
      judge: '',

      // 空格数量
      spaceNumbers: 0,
      fillAnswers: [],
      toSelect,
      toType
    }
  },
  created() {
    this.currentView = this.typeComponent[this.problem.type - 1]
    if (this.problem.type == 4) {
      this.initFill()
    }
  },
  props: {
    problem: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number
    }
  },
  methods: {
    ...mapMutations('sTask', [
      'setStudentAnswer',
      'setAnswersFinished',
      'changeCurrentProblem'
    ]),
    initFill() {
      let reg = /(\(\))|(\_+)|(\（\）)/g
      let length = this.problem.context.match(reg).length
      this.spaceNumbers = length
      this.fillAnswers = new Array(length).fill('')
    },
    handleRadio(value) {
      this.outSet(value)
      this.outChange(this.problem.question_id)
      console.log(this.problem.question_id, value)
    },
    handleMulti(value) {
      this.outSet(value)
      this.outChange(this.problem.question_id)
      console.log(value)
    },
    handleJudge(value) {
      this.outSet(value)
      this.outChange(this.problem.question_id)
      console.log(value)
    },
    fillChange(index) {
      this.outSet(this.fillAnswers)
      this.outChange(index + this.problem.question_id)
      console.log(this.fillAnswers, index + this.problem.question_id)
    },
    onChange(data) {
      this.outSet(data)
      this.outChange(this.problem.question_id)
    },
    outSet(value) {
      this.setStudentAnswer({
        question_id: this.problem.question_id,
        value
      })
    },
    outChange(param) {
      this.changeCurrentProblem(param)
    }
  },
  computed: {},
  components: {
    Radio: () => import('@/components/teacher/Test/tQuestion/tRadio.vue'),
    Multi: () => import('@/components/teacher/Test/tQuestion/tMulti.vue'),
    Judge: () => import('@/components/teacher/Test/tQuestion/tJudge.vue'),
    Fill: () => import('@/components/teacher/Test/tQuestion/tFill.vue'),
    Answer: () => import('@/components/teacher/Test/tQuestion/tAnswer.vue'),
    PtEditor
  }
}
</script>

<style scoped lang="less">
.task-card {
  min-height: 150px;
  border-bottom: 0.5px dashed gray;
  margin: 35px 0;

  .option {
    margin: 5px;

    .el-radio-group,
    .el-checkbox-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .option-label {
      margin-left: 30px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      .option-content {
        margin-left: 10px;
      }
    }
    .fill-item {
      width: 50%;
      margin: 20px 0;
      display: flex;
      align-items: center;
      span {
        width: 55px;
      }
      .el-input {
        flex: 1;
      }
    }
  }

  .option-answer {
    min-height: 300px;
  }
}
</style>
