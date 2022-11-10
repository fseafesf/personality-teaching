import ptRequest from '../../request'

export function getClassList(pn) {
  return ptRequest.get({
    url: '/teacher/class/list',
    params: {
      pn
    }
  })
}