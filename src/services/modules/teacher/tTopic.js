import ptRequest from '../../request'

export function getQuestionList(info, page_size = 10, page_no = 1) {
  return ptRequest.get({
    url: '/question/question_list',
    params: {
      info,
      page_size,
      page_no
    }
  })
}

export function getQuestionById(question_id) {
  return ptRequest.get({
    url: '/question/question_detail',
    params: {
      question_id
    }
  })
}

export function addQuestion(form) {
  const { question_name, type, level, create_user, question_option_list, answer, context, knp_id } = form
  console.log(question_name, type, level, create_user, question_option_list, answer, context, knp_id);
  return ptRequest.post({
    url: '/question/question_add',
    data: {
      question_name,
      type,
      level,
      create_user: 'cs',
      question_option_list,
      answer,
      context,
      knp_id
    }
  })
}

export function deleteQuestion(question_id) {
  return ptRequest.delete({
    url: 'question/question_delete?question_id=' + question_id,
  })
}