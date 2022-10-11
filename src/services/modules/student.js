import sxRequest from '../request'

export function test() {
  return sxRequest.get({
    url: '/home/multidata'
  })
}