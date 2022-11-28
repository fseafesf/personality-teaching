import ptRequest from '../../request'

export function login(data) {
  return ptRequest.post({
    url: '/teacher/login',
    data
  })
}

export function changePwd(data){
  return ptRequest.put({
    url:'/pwd',
    data
  })
}

