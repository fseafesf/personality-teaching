const tTest = {
  namespaced: true,
  state: () => ({
    name: 'test',
    problems: [
      { id: 1, content: '这是第一道题目', type: 2, difficultType: 1 },
      { id: 2, content: '这是第二道题目', type: 1, difficultType: 2 },
      { id: 3, content: '这是第三道题目', type: 3, difficultType: 2 },
      { id: 4, content: '这是第四道题目', type: 4, difficultType: 3 },
      { id: 5, content: '这是第五道题目', type: 5, difficultType: 1 },
      { id: 6, content: '这是第六道题目', type: 4, difficultType: 3 },
      { id: 7, content: '这是第七道题目', type: 1, difficultType: 2 },
      { id: 8, content: '这是第八道题目', type: 2, difficultType: 1 },
      { id: 9, content: '这是第九道题目', type: 3, difficultType: 3 },
    ],
    // 模拟试卷数据结构
    page: {
      title: '',
      selectProblem: [],
      exam_id: Number,
      difficultType: '',
      createTime: '',
      score: Number,
      status: Number
    },
    // 所有的试卷
    pages: [],
    currentCookie:''
  }),
  mutations: {
    addProblem(state, problem) {
      state.page.selectProblem.push(problem)
    },
    deleteProblem(state, index) {
      state.page.selectProblem.splice(index, 1)
    },
    deleteProblemType(state, type) {

    },
    initPages(state,data){
      state.pages = [...data]
    }
  },
  actions: {

  },
  getters: {

  }
}

export default tTest