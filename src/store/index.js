import Vue from 'vue'
import Vuex from 'vuex'

import test from './modules/test'
import student from './modules/student'
import ptClass from './modules/class'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    test,
    student,
    ptClass
  }
})
