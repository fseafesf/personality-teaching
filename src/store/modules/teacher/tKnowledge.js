import { addPoint, getPointById, getPointList, getPointOne } from '@/services'
import { mapTree, mapTree2 } from '@/utils/mapTree'

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
        res ? context.commit('changePoints', mapTree2(res.data.list)) : ''
      })
    },

    PointByIdActive(context, id) {
      // 用来记录当前高亮知识点 保证切换后仍然保持高亮
      context.commit('changeCurrentNode', id)

      getPointById(id).then((res) => {
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
