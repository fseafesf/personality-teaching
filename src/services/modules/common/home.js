import ptRequest from '../../request'

export function login(data) {
  return ptRequest.post({
    url: '/teacher/login',
<<<<<<< Updated upstream
    data
  })
}

export function changePwd(data){
  return ptRequest.put({
    url:'/pwd',
    data
=======
    data: {
      params: {

        ...data
      }
    }
>>>>>>> Stashed changes
  })
}

