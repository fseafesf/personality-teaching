import Vue from 'vue'
import Vuex from 'vuex'

import tAnalysis from './modules/teacher/tAnalysis'
import tClass from './modules/teacher/tClass'
import tKnowledge from './modules/teacher/tKnowledge'
import tReview from './modules/teacher/tReview'
import tTest from './modules/teacher/tTest'
import tTopic from './modules/teacher/tTopic'

import home from './modules/common/home'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  mutations: {
    changeIsLoading(state, status) {
      // 变更状态
      state.isLoading = status
    }
  },
  actions: {
  },
  modules: {
    home,
    tAnalysis,
    tClass,
    tKnowledge,
    tReview,
    tTest,
    tTopic
  }
})
