import Vue from 'vue'
import Vuex from 'vuex'

import tAnalysis from './modules/teacher/tAnalysis'
import tClass from './modules/teacher/tClass'
import tKnowledge from './modules/teacher/tKnowledge'
import tReview from './modules/teacher/tReview'
import tTest from './modules/teacher/tTest'
import tTopic from './modules/teacher/tTopic'

import tHome from './modules/teacher/tHome'
import { getCache } from '@/utils/localstorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    navBarData: getCache('navBarData') || [],

    currentIndex: 0,
    currentNavBarData: {},
    typeOptions: [
      {
        value: 1,
        label: '单选题'
      },
      {
        value: 2,
        label: '多选题'
      },
      {
        value: 3,
        label: '判断题'
      },
      {
        value: 4,
        label: '填空题'
      },
      {
        value: 5,
        label: '简答题'
      }
    ],
    levelOptions: [{
      value: 1,
      label: '简单'
    },
    {
      value: 2,
      label: '中等'
    },
    {
      value: 3,
      label: '困难'
    }]
  },
  getters: {

  },
  mutations: {
    changeIsLoading(state, status) {
      state.isLoading = status
    },
    changeCurrentIndex(state, index) {
      state.currentIndex = index
    },
    changeCurrentNavBarData(state, index) {
      state.currentNavBarData = state.navBarData[index]
    },
    changenavBarData(state, data) {
      // console.log('ok')
      state.navBarData = data
    }
  },
  actions: {
  },
  modules: {
    tHome,
    tAnalysis,
    tClass,
    tKnowledge,
    tReview,
    tTest,
    tTopic
  },
})
