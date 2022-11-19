import { getClassAPI, getStuListAPI } from '@/services/modules/teacher/tClass.js'
const tClass = {
  state: () => ({
    name: 'tClass',
    classPage: {
      page_num: 1, // 分页页号
      page_size: 20, // 分页大小
    },
    classList: [],  // 存放班级列表
    teacherInfo: [], //教师信息
    studentList: [], // 学生列表
    classInfo: {}, // 班级信息
    classId: '',  // 查看的班级编号
    stuListPage: {  //存放学生列表的分页数
      page_num: "1",
      page_size: "10"
    },
    studentList: []  // 存放班级学生信息
  }),
  mutations: {
    getClassList(state, val) {
      state.classList = val
    },
    getTeacherInfo(state, val) {
      state.teacherInfo = val
    },
    getStuList(state, val) {
      state.studentList = val
    }
  },
  actions: {
    // 班级列表
    async getClassInfoActions(store) {
      let res = await getClassAPI(store.state.classPage.page_num, store.state.classPage.page_size)
      // console.log(res)
      if (res.code === 0) {
        store.commit('getClassList', res.data)
      }
    },
    // 获取教师信息
    async getTeacherInfoActions(store) {
      let res = await getTeacherInfoAPI()
      console.log(res)
      if (res.code === 0) {
        store.commit('getTeacherInfo', res.data)
      }
    },
    // 获取班级学生列表
    async getStuListActions(store, payload) {
      const res = await getStuListAPI(payload.cookie, store.state.classId, store.state.stuListPage)
      if (res.code === 0) {
        store.commit("getStuList", res.data)
      }
    }
  },
  getters: {

  }
}

export default tClass
