import { getQuestionList, getQuestionById, deleteQuestion, addQuestion, updataQuestion } from '@/services'
import { questionType } from '@/utils/questionType'
import { questionLevel } from '@/utils/questLevel'

const tTopic = {
  state: () => ({
    topicTableData: [],
    total: '',
    currentTopicEditData: {},
  }),
  mutations: {
    changeCurrentTopicEditData(state, data) {
      state.currentTopicEditData = data
    },
    ChangeTopicTableData(state, data) {
      if (!data.list) {
        state.topicTableData = data.list
        state.total = data.total
        return
      }
      const mapData = data.list.map(item => {
        item.type = questionType(item.type)
        item.level = questionLevel(item.level)
        return item
      })
      state.topicTableData = mapData
      state.total = data.total
    }
  },
  actions: {
    QuestionListActive(context, payload) {
      getQuestionList(payload?.type, payload?.level, payload?.keyword, payload?.size, payload?.page).then(res => {
        context.commit('ChangeTopicTableData', res.data)
      }).catch(err => {
        console.log(err);
      })
    },
    QuestionByIdActive(context, id) {
      console.log(id, 'id');
      getQuestionById(id).then(res => {
        console.log(res, 'ijd')
        context.commit('changeCurrentTopicEditData', res.data)
      })
    },
    QuestionDeleteActive(context, id) {
      return new Promise((resolve, reject) => {
        deleteQuestion(id).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    QuestionAddActive(context, form) {
      return new Promise((resolve, reject) => {
        addQuestion(form).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    QuestionUpdataActive(context, form) {
      return new Promise((resolve, reject) => {
        updataQuestion(form).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {

  }
}

export default tTopic