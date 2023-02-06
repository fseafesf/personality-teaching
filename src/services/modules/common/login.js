import ptRequest from '../../request'

export function login(data) {
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

export function changePwd({old_pwd,new_pwd}){
  return ptRequest.put({
    url: '/pwd',
    params: {
      old_pwd,
      new_pwd
    }
  })
}

