import ptRequest from '../../request'

export function getPointList(info, page_size = 10, page_no = 1) {
  return ptRequest.get({
    url: '/point/point_list',
    params: {
      info,
      page_size,
      page_no
    }
  })
}