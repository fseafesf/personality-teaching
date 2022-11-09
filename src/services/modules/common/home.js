import sxRequest from '../../request'

export function login(data) {
  return sxRequest.post({
    url: '/login',
    data
  })
}

export function test(data) {
  return sxRequest.get({
    url: '/teacher/exam/list',
    data
  }).then(res => res)
}