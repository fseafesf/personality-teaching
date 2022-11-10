import ptRequest from '../../request'

/**
 * 获取班级列表
 * @param {*} pn: 分页页号
 * @returns 
 */
export const getClassAPI = pn => {
  return ptRequest.get({
    url: '/teacher/class/list',
    params: {
      pn
    }
  })
}

/**
 * 新增班级
 * @param {*} param0 {name：班级名称, college：学院, major：专业}
 * @returns 
 */
export const addClassAPI = ({name, college, major}) => {
  return ptRequest.post({
    url: '/teacher/class',
    params: {
      name,
      college,
      major
    }
  })
}

/**
 * 删除班级
 * @param {*} class_id: 班级编号
 * @returns 
 */
export const deleteClassAPI = (class_id) => {
  return ptRequest.delete({
    url: '/teacher/class',
    params: {
      class_id
    }
  })
}

/**
 * 修改班级
 * @param {*} param0 { class_id：班级编号, name：班级名称, college：学院, major：专业 }
 * @returns 
 */
export const modifyClassAPI = ({ class_id, name, college, major }) => {
  return ptRequest.put({
    url: '/teacher/class',
    params: {
      class_id,
      name,
      college,
      major
    }
  })
}