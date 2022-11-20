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
          },
          {
            // name: '添加知识点',
            path: '/teacher/knowledge/add',
          },
          {
            // name: '编辑知识点',
            path: '/teacher/knowledge/edit',
          }
        ]
      },
      {
        name: '题目管理',
        path: '/teacher/topic',
        children: [
          {
            name: '添加题目',
            path: '/teacher/topic/add',
          },
          {
            name: '编辑题目',
            path: '/teacher/topic/edit',
          }
        ]
      },
      {
        name: '班级管理',
        path: '/teacher/class',
        children: [
          {
            name: '班级信息',
            path: '/teacher/class/classInfo'
          }
        ]
      },
      {
        name: '试卷管理',
        path: '/teacher/examHome',
        children: [
          {
            name: '试卷列表',
            path: '/teacher/examHome/examPaper'
          },
          {
            name: '新增试卷',
            path: '/teacher/examHome/test'
          },
          {
            name: '预览试卷',
            path: '/teacher/examHome/preview'
          },
          {
            name: '发布试卷',
            path: '/teacher/examHome/release'
          }
        ]
      },
      {
        name: '试卷评阅',
        path: '/teacher/review',
        children: [
          {
            name: '学生列表',
            path: '/teacher/review/correctPaper'
          }
        ]
      },
      {
        name: '学情分析',
        path: '/teacher/analysis'
      }
    ],
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
    changenavBarData(state) {
      console.log('ok')
      state.navBarData = [
        {
          name: '我的',
          path: '/student/home'
        }
      ]
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
