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
      {id:'123', name: "张三", score: 50, status: 0, update_time: "2022-11-07T15:11:01+08:00" },
      {id:'456', name: "李四", score: 70, status: 1, update_time: "2022-11-07T15:11:01+08:00" },
      {id:'789', name: "王五", score: 30, status: -1, update_time: "2022-11-07T15:11:01+08:00" },
      {id:'134', name: "小周", score: 20, status: 2, update_time: "2022-11-07T15:11:01+08:00" },
      {id:'945', name: "nx", score: 80, status: 0, update_time: "2022-11-07T15:11:01+08:00" },
    ]
  }),
  mutations: {
    init(state, param) {
      if (typeof param.val == "object") {
        state[param.key] = _.cloneDeep(param.val)
      }
      state[param.key] = param.val
    },
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
          reslove('success')
        }).catch(err => reject(err))
      })
    }
  },
  getters: {

  }
}

export default tReview