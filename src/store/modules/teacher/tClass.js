import { getClassAPI } from '@/services/modules/teacher/tClass.js'
const tClass = {
  state: () => ({
    name: 'tClass',
    pn: 1,  // 分页页号
    classList: [],
    checkClassName: '',
    checkClassMajor: ''
  }),
  mutations: {
    getClassList(state, val) {
      state.classList = val
    }
  },
  actions: {
    async getClassInfoActions(store) {
      let res = await getClassAPI(1, 5)
      console.log(res);
      // console.log(res)
      if (res.code === 0) {
        store.commit('getClassList', res.data)
      }
    }
  },
  getters: {

  }
}

export default tClass
