import ptRequest from '../../request'

export function getExamList(param) {
  return ptRequest.get({
    url: '/student/exam/get',
    params: {
      student_id: param
    }
  })
}

export function uploadAnswer(data) {
  return ptRequest.put({
    url: '/student/exam/upload',
    data
  })
}

export function getAnswers(data) {
  return ptRequest.get({
    url: '/student/exam/review',
    params: {
      exam_id: data.exam_id,
      student_id: data.student_id,
      status: data.status
    }
  })
}
