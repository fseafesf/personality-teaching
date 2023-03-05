import ptRequest from '../../request'

// 教师登录
// teach.komorebi-nxj.cn/api/teacher/point/uploadImage
export function uploadImageApi(form) {
  return ptRequest.post({
    url: '/teacher/point/uploadImage',
    data: form
  })
}
