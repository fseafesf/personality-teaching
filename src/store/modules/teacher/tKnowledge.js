import { addPoint, getPointById, getPointList, getPointOne } from "@/services"
import { mapTree } from "@/utils/mapTree"

const tKnowledge = {
  state: () => ({
    points: [],
    ponitOnes: [],
    pointDetail: {},
    currentNode: ''
  }),
  mutations: {
    changePoints(state, data) {
      state.points = data
    },
    changePointOnes(state, data) {
      state.ponitOnes = data
    },
    changepointDetail(state, data) {
      state.pointDetail = data
    },
    changeCurrentNode(state, data) {
      state.currentNode = data
    }
  },
  actions: {
    PointListActive(context) {
      getPointList().then(res => {
        context.commit('changePoints', mapTree(res.data.list))
      })
    },
    PointOneActive(context) {
      getPointOne().then(res => {
        context.commit('changePointOnes', res.data)
      })
    },
    PointByIdActive(context, id) {
      context.commit('changeCurrentNode', id)
      getPointById(id).then(res => {
        // console.log(res)
        context.commit('changepointDetail', res.data)
      })
    },
    PointAddActive(context, payload) {
      return new Promise((resolve, reject) => {
        addPoint(payload.parent_knp_id, payload.level, payload.name, payload.context, 'cs').then(res => {
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

export default tKnowledge