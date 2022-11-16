import { getPointById, getPointList } from "@/services"

const tKnowledge = {
  state: () => ({
    points: [],
    pointDetail: {}
  }),
  mutations: {
    changePoints(state, data) {
      state.points = data
    },
    changepointDetail(state, data) {
      state.pointDetail = data
    }
  },
  actions: {
    PointListActive(context) {
      getPointList().then(res => {
        context.commit('changePoints', res.data)
      })
    },
    PointByIdActive(context, id) {
      getPointById(id).then(res => {
        context.commit('changepointDetail', res.data)
      })
    }
  },
  getters: {

  }
}

export default tKnowledge