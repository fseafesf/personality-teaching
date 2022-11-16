import ptRequest from '../../request'

// 知识点列表
export function getPointList(info, page_size = 10, page_no = 1) {
  return ptRequest.get({
    url: '/teacher/point/list',
    params: {
      info,
      page_size,
      page_no
    }
  })
}

// 知识点详情
export function getPointById(knp_id) {
  return ptRequest.get({
    url: '/teacher/point/detail',
    params: {
      knp_id
    }
  })
}