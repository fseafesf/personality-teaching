import ptRequest from '../../request'

// 请求上传图片
export function uploadImageApi(form) {
  return ptRequest.post({
    url: '/teacher/point/uploadImage',
    data: form
  })
}
