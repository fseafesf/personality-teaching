import sxRequest from '../../request'

export function login(data) {
  return sxRequest.post({
    url: '/api/login',
    data: {
      ...data
    }
  })
}

export function test() {
  return sxRequest.get({
    url: '/api/teacher/exam/list',
  })
}