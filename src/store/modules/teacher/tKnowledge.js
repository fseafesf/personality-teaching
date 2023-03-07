import { addPoint, getPointById, getPointList, getPointOne } from '@/services'
import { HTMLDecode } from '@/utils/htmlUtil'
import { mapTree } from '@/utils/mapTree'

const tKnowledge = {
  state: () => ({
    points: [], // 知识点树
    ponitOnes: [],
    pointDetail: {}, // 当前知识点信息
    currentNode: '' // 当前知识点id
  }),
  mutations: {
    changePoints(state, data) {
      state.points = data
    },
    changePointOnes(state, data) {
      state.ponitOnes = data
    },
    changePointDetail(state, data) {
      state.pointDetail = data
    },
    changeCurrentNode(state, data) {
      state.currentNode = data
    }
  },
  actions: {
    PointListActive(context) {
      getPointList().then((res) => {
        res ? context.commit('changePoints', mapTree(res.data.list)) : ''
      })
    },

    PointByIdActive(context, id) {
      // context.commit('changeCurrentNode', id)
      getPointById(id).then((res) => {
        console.log(res.data.info)
        // res.data.info.context = HTMLDecode(res.data.info.context)
        res ? context.commit('changePointDetail', res.data) : ''
      })
    },

    PointAddActive(context, payload) {
      return new Promise((resolve, reject) => {
        addPoint(
          payload.parent_knp_id,
          payload.level,
          payload.name,
          payload.context,
          'cs'
        )
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  getters: {}
}

export default tKnowledge
