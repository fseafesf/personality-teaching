import { getClassAPI, getAppointedClassAPI, getStuListAPI } from '@/services/modules/teacher/tClass.js'
const tClass = {
  state: () => ({
    name: 'tClass',
    page_num: 1, // 分页页号
    page_size: 20, // 分页大小
    classList: [],  // 存放班级列表
    checkClassName: '',  // 班级名称
    checkClassMajor: '', // 专业名称
    classInfo: [],  // 班级信息
    teacherInfo: [], //教师信息
    studentList: [], // 学生列表
    stuListPage: {
      page_num: 1,
      page_size: 20
    }
  }),
  mutations: {
    getClassList(state, val) {
      state.classList = val
    },
    getappointedClass(state, val) {
      state.classInfo = val
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
      let res = await getClassAPI(store.state.page_num, store.state.page_size)
      if (res.code === 0) {
        store.commit('getClassList', res.data)
      }
    },
    // 查询单个班级
    async getappoinClassActions(store) {
      let res = await getAppointedClassAPI(this.$cookies.get("session_id"), store.state.classList.class_id)
      console.log(res)
      if (res.code === 0) {
        store.commit('getappointedClass', res.data)
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
    // 获取学生列表
    /* async getStuListActions(store) {
      let res = await getStuListAPI(this.$cookies.get('session_key'), store.state.stuListPage.page_num, store.state.stuListPage.page_size)
      console.log(res)
      if (res.code === 0) {
        store.commit('getStuList', res.data)
      }
    } */
  },
  getters: {

  }
}

export default tClass
