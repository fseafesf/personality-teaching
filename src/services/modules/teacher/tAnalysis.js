import ptRequest from '../../request'

/**
 * 个人学情分析搜索学生
 * @param {*} search_text  学号或学生名
 * @returns 
 */
export const searchStudentAPI = ( search_text) => {
  return ptRequest.get({
    url: "/teacher/student/search",
    params: {
      search_text
    }
  })
}