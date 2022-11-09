import { getQuestionList, getQuestionById, deleteQuestion, addQuestion } from '@/services'
import { questionType } from '@/utils/questionType'
import { questionLevel } from '@/utils/questLevel'

const tTopic = {
  state: () => ({
    topicTableData: [],
    currentTopicEditData: {},
  }),
  mutations: {
    changeCurrentTopicEditData(state, data) {
      state.currentTopicEditData = data
    },
    ChangeTopicTableData(state, data) {
      const mapData = data.list.map(item => {
        item.type = questionType(item.type)
        item.level = questionLevel(item.level)
        return item
      })

      state.topicTableData = mapData
    }
  },
  actions: {
    QuestionListActive(context) {
      getQuestionList().then(res => {
        context.commit('ChangeTopicTableData', res.data)
      })
    },
    QuestionByIdActive(context, id) {
      getQuestionById(id).then(res => {
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

    }
  },
  getters: {

  }
}

export default tTopic