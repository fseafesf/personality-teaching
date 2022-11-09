import ptRequest from '../../request'

export function login(data) {

  return ptRequest.post({
    url: '/api/login',
    data: {
      ...data
    }
  })
}

export function test(question_id) {
  return ptRequest.get({
    url: '/question/question_detail',
    params: {
      question_id
    }
  })
}