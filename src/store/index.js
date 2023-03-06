import Vue from 'vue'
import Vuex from 'vuex'

import tAnalysis from './modules/teacher/tAnalysis'
import tClass from './modules/teacher/tClass'
import tKnowledge from './modules/teacher/tKnowledge'
import tReview from './modules/teacher/tReview'
import tTest from './modules/teacher/tTest'
import tTopic from './modules/teacher/tTopic'
import userinfo from './modules/common/userinfo'

import tHome from './modules/teacher/tHome'
import { getCache } from '@/utils/localstorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false, // 控制loading组件
    headerData: getCache('headerData') || [], // header数据
    userinfo: '',
    typeOptions: [
      // 添加、编辑、搜索题目的题型映射
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
    levelOptions: [
      // 添加、编辑、搜索题目，添加、编辑知识点的难度映射
      {
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
      }
    ]
  },
  getters: {},
  mutations: {
    changeIsLoading(state, status) {
      state.isLoading = status
    },
    changeHeaderData(state, data) {
      state.headerData = data
    }
  },
  actions: {},
  modules: {
    tHome,
    tAnalysis,
    tClass,
    tKnowledge,
    tReview,
    tTest,
    tTopic,
    userinfo
  }
})
