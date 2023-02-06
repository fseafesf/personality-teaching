import { getPageList, getReviewClasses } from '@/services'
import _ from 'lodash'

const tReview = {
  namespaced: true,
  state: () => ({
    name: 'tReview',

    // 初始化发布的试卷列表
    reviewPages: [],

    // 发布的试卷对应的班级
    reviewClasses: [
      { id: '1', count: 15, name: '2001班', college: '计科院', major: '计科' },
      { id: '2', count: 20, name: '2002班', college: '计科院', major: '软工' },
      { id: '3', count: 5, name: '2003班', college: '计科院', major: '软工' },
      { id: '4', count: 18, name: '2004班', college: '计科院', major: '网工' },
      { id: '5', count: 36, name: '2005班', college: '计科院', major: '人工智能' },
      { id: '6', count: 2, name: '2006班', college: '计科院', major: '计科' },
    ],

    // 班级对应的学生，
    reviewStudents: [
      { id: '123', name: "张三", score: 50, status: 0, update_time: "2022-11-07T15:11:01+08:00" },
      { id: '456', name: "李四", score: 70, status: 1, update_time: "2022-11-07T15:11:01+08:00" },
      { id: '789', name: "王五", score: 30, status: -1, update_time: "2022-11-07T15:11:01+08:00" },
      { id: '134', name: "小周", score: 20, status: 2, update_time: "2022-11-07T15:11:01+08:00" },
      { id: '945', name: "nx", score: 80, status: 0, update_time: "2022-11-07T15:11:01+08:00" },
    ],

    // 当前评阅试卷的每道题分数
    currentPageScore: new Map(),

    // 当前评阅试卷客观题目每道题分数
    currentPageObjectiveScore: new Map(),

    // 当前批阅题目
    currentProblem: "",

    totalScore: 0,
    totalObjectiveScore:0

  }),
  mutations: {

    init(state, param) {
      if (typeof param.val == "object") {
        state[param.key] = _.cloneDeep(param.val)
      }
      state[param.key] = param.val
    },

    // param 传入当前批阅试卷的题目数组
    initScore(state, params) {
      for (const problem of params) {
        state.currentPageScore.set(problem.question_id, "0")
      }
    },

    // param 传入当前批改过试卷的批改信息
    initCorrectedScore(state, params) {
      for (const param of params) {
        state.currentPageScore.set(param[0], param[1])
      }
    },

    // param传入批阅分数时的题目id以及分数
    setScore(state, param) {
      state.currentPageScore.set(param.question_id, param.value)
    },

    // 用来清空map
    clearScore(state) {
      state.currentPageScore.clear()
    },

    // param 传入客观题题目id 和 分数
    setObjectiveScore(state, param) {
      state.currentPageObjectiveScore.set(param.question_id, param.value)
    },

    // 清空客观题分数map
    clearObjectiveScore(state) {
      state.currentPageObjectiveScore.clear()
    },

    // 改变当前批改题目
    changeCurrentProblem(state, value) {
      state.currentProblem = value
    },

    // 改变总分
    changeTotalScore(state, value) {
      state.totalScore = value
    },

    // 改变客观题总分
    changeTotalObjectiveScore(state, value) {
      state.totalObjectiveScore = value
    },

    // 清除总分
    clearTotalScore(state) {
      state.totalScore = 0
    },

    // 清除客观题总分
    clearTotalObjectiveScore(state) {
      state.totalObjectiveScore = 0
    }
  },
  actions: {

    getInitReviewPages({ commit }, payload) {
      return new Promise((reslove, reject) => {
        getPageList().then((res) => {
          reslove('success')
          commit('init', {
            key: 'reviewPages',
            val: res.data.exam_list
          })
        }).catch(err => reject(err))
      })
    },

    getInitReviewClasses({ commit }, payload) {
      console.log(payload, "--------------actions------------")
      return new Promise((reslove, reject) => {
        getReviewClasses(payload).then(res => {
          console.log(res)
          reslove(res)
        }).catch(err => reject(err))
      })
    }
  },
  getters: {
    // getters 作为属性去用的话 会缓存结果 要每次调用 得用方法
    TotalScore: (state) => () => {
      console.log(state.currentPageScore)
      return [...state.currentPageScore.values()].reduce((pre, cur) => {
        return pre + (+cur)
      }, 0)
    },
    TotalObjectiveScore: (state) => () => {
      return [...state.currentPageObjectiveScore.values()].reduce((pre, cur) => {
        return pre + (+cur)
      }, 0)
    }
  }
}

export default tReview