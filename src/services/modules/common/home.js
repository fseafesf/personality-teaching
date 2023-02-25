import ptRequest from '../../request'

export function login(data) {
  return ptRequest.post({
    url: '/teacher/login',
    data: {
      params: {
        ...data
      }
    }
  })
}
