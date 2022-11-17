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
        const level1 = []
        const other = []
        res.data.list.forEach(item => {
          if (item.knp_id === item.parent_knp_id) {
            const newItem = {}
            newItem.id = item.knp_id
            newItem.label = item.name
            newItem.children = []
            level1.push(newItem)
          } else {
            const newItem = {}
            newItem.id = item.knp_id
            newItem.label = item.name
            newItem.parent_knp_id = item.parent_knp_id
            newItem.children = []
            other.push(newItem)
          }
        })
        const level2 = []
        other.forEach(item => {
          level1.forEach(item1 => {
            if (item1.id === item.parent_knp_id) {
              item1.children.push(item)
              level2.push(item)
            }
          })
        })

        mapTree(other, level2)

        context.commit('changePoints', level1)
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