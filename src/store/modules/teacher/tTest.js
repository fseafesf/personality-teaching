import { getQuestionList, getPageList, getClassAPI, getStuListAPI } from '@/services'
import _, { reject } from 'lodash'

const tTest = {
  namespaced: true,
  state: () => ({
    name: 'test',
    // 初始化题目
    problems: [],
    // 每当添加 或者 编辑时 填充当前卷子的信息到这里
    page: {
      title: '',
      selectProblem: [],
      exam_id: String,
      comment: ''
    },
    // 所有的试卷
    pages: [],

    // TODO : keepAlive选择加入
    keepAlivePage: [],

    // 班级列表
    classes: [],
    // 学生列表
    students: []
  }),
  mutations: {
    //初始试卷
    initPages(state, data) {
      state.pages = _.cloneDeep(data)
    },
    //初始题目
    initProblems(state, data) {
      state.problems = _.cloneDeep(data)
    },

    // 初始班级
    initClasses(state, data) {
      state.classes = _.cloneDeep(data)
    },
    initStudents(state, data) {
      state.students = _.cloneDeep(data)
    },
    //添加题目
    addProblem(state, problem) {
      state.page.selectProblem.push(problem)
    },
    //移除题目
    deleteProblem(state, index) {
      state.page.selectProblem.splice(index, 1)
    },

    deleteTypeProblem(state, type) {
      state.page.selectProblem = state.page.selectProblem.filter((item) => {
        return item.type !== type
      })
    },
    //更改卷子信息
    setPageData(state, param) {
      let val = param.val;
      if (typeof param.val == 'object') {
        val = _.cloneDeep(param.val)
      }
      state.page[param.key] = val
    },

    //清除卷子信息
    clearPageData(state, param) {
      state.page[param.key] = param.val
    }
  },
  actions: {
    getInitPages(context, payload) {
      return new Promise((reslove, reject) => {
        getPageList(payload.cookie, payload?.page, payload?.page_size).then(res => {
          reslove(res.data.total)
          context.commit('initPages', res.data.exam_list)
        }).catch(err => reject(err))
      })
    },
    getProblems(context, payload) {
      return new Promise((reslove, reject) => {
        getQuestionList(payload?.type, payload?.level, payload?.context, payload?.page_size, payload?.page_no).then(res => {
          console.log(res)
          reslove(res.data.total)
          context.commit('initProblems', res.data.list)
        }).catch(err => reject(err))
      })
    },
    getClasses(context, payload) {
      return new Promise((reslove, reject) => {
        getClassAPI({ page_num: payload.page_num, page_size: payload.page_size = 20 }).then(res => {
          reslove(res.data)
          context.commit('initClasses', res.data)
        }).catch(err => reject(err))
      })
    },
    getStudents(context, payload) {
      return new Promise((reslove, reject) => {
        getStuListAPI(payload.cookie, payload.class_id, { page_num: payload.page_num = 1, page_size: payload.page_size = 40 }).then(res => {
          reslove(res)
          context.commit('initStudents', res.data)
        }).catch(err => reject(err))
      })
    }
  },
  getters: {

  }
}

export default tTest