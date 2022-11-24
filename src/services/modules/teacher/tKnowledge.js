import ptRequest from '../../request'

// 知识点列表
export function getPointList(info, page_size = 100, page_no = 1) {
  return ptRequest.get({
    url: '/teacher/point/list',
    params: {
      info,
      page_size,
      page_no
    }
  })
}

// 知识点一级列表
export function getPointOne() {
  return ptRequest.get({
    url: '/teacher/point/list/one_stage',

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

// 添加知识点
export function addPoint(parent_knp_id, level, name, context, create_user) {
  return ptRequest.post({
    url: '/teacher/point',
    data: {
      parent_knp_id,
      level,
      name,
      context,
      create_user
    }
  })
}

// 修改知识点
export function updatePoint(knp_id, parent_knp_id, level, name, context, create_user) {
  return ptRequest.put({
    url: '/teacher/point',
    data: {
      knp_id,
      parent_knp_id,
      level,
      name,
      context,
      create_user
    }
  })
}

// 删除知识点
export function deletePoint(knp_id) {
  return ptRequest.delete({
    url: '/teacher/point',
    data: {
      knp_id
    }
  })
}

// 修改知识点联系
export function updatePointConnect(knp_id, p_knp_id) {
  return ptRequest.put({
    url: '/teacher/point/connection',
    data: {
      knp_id,
      p_knp_id
    }
  })
}