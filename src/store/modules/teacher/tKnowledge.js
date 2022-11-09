import { getPointList } from "@/services"

const tKnowledge = {
  state: () => ({
    points: []
  }),
  mutations: {
    changePoints(state, data) {
      state.points = data
    }
  },
  actions: {
    PointListActive(context) {
      getPointList().then(res => {
        context.commit('changePoints', res.data)
      })
    }
  },
  getters: {
    // treePoint(state) {
    //   return
    // }
  }
}

export default tKnowledge