import ptRequest from '../../request'

export function login(data) {
  return ptRequest.post({
    url: '/teacher/login',
<<<<<<< Updated upstream
    data: {
=======
    params:{
>>>>>>> Stashed changes
      ...data
    }
  })
}

