import { getClassAPI, getStuListAPI, getTeacherInfoAPI } from '@/services/modules/teacher/tClass.js'
const tClass = {
  state: () => ({
    name: 'tClass',
    classPage: {
      page_num: 1, // 分页页号
      page_size: 10, // 分页大小
    },
    classList: [],  // 存放班级列表
    classNum: 0,    // 存放班级总数
    teacherInfo: [], //教师信息
    classInfo: {}, // 班级信息
    classId: '',  // 查看的班级编号
    stuListPage: {  //存放学生列表的分页数
      page_num: 1,
      page_size: 10
    },
    studentList: [],  // 存放班级学生信息
    studentTotal: 0,  //存放学生总数
  }),
  mutations: {
    getClassList(state, val) {
      state.classList = val.data
      state.classNum = val.total
    },
    getTeacherInfo(state, val) {
      state.teacherInfo = val
    },
    getStuList(state, val) {
      state.studentList = val.data
      state.studentTotal = val.total
    }
  },
  actions: {
    // 班级列表
    async getClassInfoActions(store) {
      let res = await getClassAPI(store.state.classPage)
      if (res.code === 0) {
        store.commit('getClassList', res)
      }
    },
    // 获取教师信息
    async getTeacherInfoActions(store) {
      let res = await getTeacherInfoAPI()
      if (res.code === 0) {
        store.commit('getTeacherInfo', res.data)
      }
    },
    // 获取班级学生列表
    async getStuListActions(store, payload) {
      const res = await getStuListAPI(payload.cookie, store.state.classId, store.state.stuListPage)
      if (res.code === 0) {
        store.commit("getStuList", res)
      }
    }
  },
  getters: {

  }
}

export default tClass
