import { getClassAPI, getStuListAPI, getTeacherInfoAPI, getAppointedClassAPI, getUnjoinStuAPI } from '@/services/modules/teacher/tClass.js'
const tClass = {
  state: () => ({
    name: 'tClass',
    classPage: {
      page_num: 1, // 分页页号
      page_size: 50, // 分页大小
    },
    classList: [],  // 存放班级列表
    classNum: 0,    // 存放班级总数
    teacherInfo: [], //教师信息
    classInfo: {}, // 班级信息
    classId: '',  // 查看的班级编号
    stuListPage: {  //存放学生列表的分页数
      page_num: 1,
      page_size: 100
    },
    studentList: [],  // 存放班级学生信息
    studentTotal: 0,  //存放学生总数
    unJoinStuPage: {  // 未加入班级学生页码
      page_num: 1,
      page_size: 10
    },
    unJoinClassList: [],  // 未加入班级学生列表
    unJoinStuTotal: 0,  // 未加入班级学生总数
    content: ""  // 未加入班级查询关键字
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
    },
    // 保存班级id
    saveClassId(state, data) {
      state.classId = data
    },
    // 保存单个班级信息
    getClassInfo(state, data) {
      state.classInfo = data
    },
    getUnJoinClsStu(state, val) {
      state.unJoinClassList = val.data
      state.unJoinStuTotal = val.total
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
    // 查询单个班级
    getPointedClassIdActions(store, classid) {
      store.commit("saveClassId", classid)
      getAppointedClassAPI(classid).then(res => {
        res ? store.commit("getClassInfo", res.data) : ""
      })
    },
    // 查询班级学生列表
    async getStuListActions(store) {
      let res = await getStuListAPI(store.state.classId, store.state.stuListPage)
      if (res.code === 0) {
        store.commit("getStuList", res)
      }
    },
    // 查询未加入班级学生列表
    async getUnJoinClsStuActions(store) {
      let res = await getUnjoinStuAPI(store.state.unJoinStuPage, store.state.content)
      if (res.code === 0) {
        store.commit('getUnJoinClsStu', res)
      }
    }
  },
  getters: {

  }
}

export default tClass
