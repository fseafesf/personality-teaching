const tTopic = {
  state: () => ({
    topicTableData: [
      {
        type: {
          value: '1',
          label: '单选题'
        },
        content: '题目内容',
        A: 'a',
        B: 'b',
        C: 'c',
        D: 'd',
        analysis: '123',
        difficulty: "简单"
      },
      {
        type: {
          value: '3',
          label: '判断题'
        },
        content: '题目内容',
        A: 'a',
        B: 'b',
        C: 'c',
        D: 'd',
        analysis: '123',
        difficulty: "中等"
      },
      {
        type: {
          value: '1',
          label: '单选题'
        },
        content: '题目内容',
        A: 'a',
        B: 'b',
        C: 'c',
        D: 'd',
        analysis: '123',
        difficulty: "中等"
      }
    ],
    currentTopicEditData: {}
  }),
  mutations: {
    changeCurrentTopicEditData(state, data) {
      state.currentTopicEditData = data
    }
  },
  actions: {

  },
  getters: {

  }
}

export default tTopic