import ptRequest from '../../request'

// 教师登录
export function teacherLogin(data) {
  return ptRequest.post({
    url: '/teacher/login',
    data
  })
}

// export function changePwd(data) {
//   return ptRequest.put({
//     url: '/pwd',
//     data
//   })
// }

export function changePwd({ old_pwd, new_pwd }) {
  return ptRequest.put({
    url: '/pwd',
    params: {
      old_pwd,
      new_pwd
    }
  })
}

// 学生登录
export function studentLogin(data) {
  return ptRequest.post({
    url: '/student/login',
    data
  })
}
