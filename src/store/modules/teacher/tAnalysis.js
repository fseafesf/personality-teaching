import { getPointList } from '@/services'
import { mapTree } from '@/utils/mapTree'
const tAnalysis = {
  state: () => ({
    name: 'tAnalysis',
    checkedPoints: [],  // 存放已选中的节点数据
    analysisPoints: [], // 知识点树形结构数据
    pointsList: [],  // 知识点扁平结构
    isResetChecked: false,  // 是否清空知识点树的选择
    selectedId: '', // 搜索的知识点id
  }),
  mutations: {
    PointListMutation(state, data) {
      state.analysisPoints = data
    },
    checkedPointsMutation(state, data) {
      state.checkedPoints = data
    }
  },
  actions: {
    PointListAction(context) {
      getPointList().then((res) => {
        res ? context.commit('PointListMutation', mapTree(res.data.list)) : ''
      })
    },
  },
  getters: {

  }
}

export default tAnalysis