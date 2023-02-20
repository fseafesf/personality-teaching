import ptRequest from '../../request'

/**
 * 获取班级列表
 * @param {*}  {page_num：分页页号 , page_size：分页大小} 
 * @returns 
 */
export const getClassAPI = ({ page_num, page_size }) => {
  return ptRequest.get({
    url: '/teacher/class/list',
    params: {
      page_num,
      page_size
    },
  })
}

/**
 * 新增班级
 * @param {*} param0 {name：班级名称, college：学院, major：专业}
 * @returns 
 */
export const addClassAPI = ({ name, college, major }) => {
  return ptRequest.post({
    url: '/teacher/class',
    params: {
      name,
      college,
      major
    }
  })
}

/**
 * 删除班级
 * @param {*} class_id: 班级编号
 * @returns 
 */
export const deleteClassAPI = (class_id) => {
  return ptRequest.delete({
    url: '/teacher/class',
    params: {
      class_id
    }
  })
}

/**
 * 修改班级
 * @param {*} param0 { class_id：班级编号, name：班级名称, college：学院, major：专业 }
 * @returns 
 */
export const modifyClassAPI = ({ class_id, name, college, major }) => {
  return ptRequest.put({
    url: '/teacher/class',
    params: {
      class_id,
      name,
      college,
      major
    }
  })
}

/**
 * 查看单个班级
 * @param {*} cookie 用于权限校验
 * @param {*} class_id 班级编号
 * @returns 
 */
export const getAppointedClassAPI = (class_id) => {
  return ptRequest.get({
    url: '/teacher/class',
    /* headers: {
      'Cookie': `session_id = ${cookie}`
    }, */
    params: {
      class_id
    }
  })
}

/**
 * 获取学生列表
 */
export const getStuListAPI = (class_id, { page_num, page_size }) => {
  return ptRequest.get({
    url: '/teacher/class/student/list',
    // headers: {
    //   'Cookie': `session_key=${cookie}`
    // },
    params: {
      class_id,
      page_num,
      page_size
    }
  })
}

/**
 * 新增学生
 * @param {*} cookie 
 * @param {*} param1 { name：姓名, student_no: 学号, college：学院, major：专业, phone_number：电话号码 }
 * @returns 
 */
export const addStudentAPI = ({ name, student_no, college, major, phone_number }) => {
  return ptRequest.post({
    url: '/teacher/student',
    data: {
      name,
      student_no,
      college,
      major,
      phone_number
    }
  })
}

/**
 * 查询未加入班级学生
 * @param {*} cookie 
 * @param {*} param1 { page_num：分页号, page_size：分页大小} content关键字
 * @returns 
 */
export const getUnjoinStuAPI = ({ page_num, page_size }, content) => {
  return ptRequest.get({
    url: '/teacher/student/list',
    params: {
      page_num,
      page_size,
      content
    }
  })
}

/**
 * 给班级添加学生
 * @param {*} cookie 
 * @param {*} class_id 班级编号
 * @param {*} student_id 学生编号
 * @returns 
 */
export const addStuToClassAPI = (class_id, student_id) => {
  return ptRequest.post({
    url: "/teacher/class/student",
    /* headers: {
      "Cookie": `session_key=${cookie}`
    }, */
    params: {
      class_id,
      student_id
    }
  })
}

/**
 * 删除班级学生
 * @param {*} cookie 
 * @param {*} param1 { class_id：班级编号, student_id：学生编号 }
 * @returns 
 */
export const deleteStuAPI = ({ class_id, student_id }) => {
  return ptRequest.delete({
    url: '/teacher/class/student',
    params: {
      class_id,
      student_id
    }
  })
}

/**
 * 查询教师信息
 * @returns 
 */
export const getTeacherInfoAPI = () => {
  return ptRequest.get({
    url: '/teacher/info',
  })
}

/**
 * 删除未加入班级学生
 * student_id 学生id
 */
export const deleteUnJoinStuAPI = (student_id) => {
  return ptRequest.delete({
    url: "/teacher/student",
    params: {
      student_id
    }
  })
}

// 查询班级名是否存在 
export const checkUniqueClassAPI = (name) => {
  return ptRequest.get({
    url: "/teacher/class/check",
    params: {
      name
    }
  })
}
