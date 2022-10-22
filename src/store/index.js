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
    isLoading: false,
    navBarData: [
      {
        name: '首页',
        path: '/home'
      },
      {
        name: '知识点管理',
        path: '/teacher/knowledge',
        children: [
          {
            name: '知识点树',
            path: '/teacher/knowledge/tree',
          },
          {
            name: '知识点联系',
            path: '/teacher/knowledge/contact',
          }
        ]
      },
      {
        name: '题目管理',
        path: '/teacher/topic'
      },
      {
        name: '班级管理',
        path: '/teacher/class'
      },
      {
        name: '试卷管理',
        path: '/teacher/test'
      },
      {
        name: '试卷评阅',
        path: '/teacher/review'
      },
      {
        name: '学情分析',
        path: '/teacher/analysis'
      },
    ],
    currentIndex: 0,
    currentNavBarData: {}
  },
  getters: {
    // currentNavBarData(state) {
    //   const index = state.currentIndex
    //   return state.navBarData[index];
    // }
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
