import ptRequest from '../../request'

// 题目列表
export function getQuestionList(type, level, context, page_size = 10, page_no = 1) {
  return ptRequest.get({
    url: '/teacher/question/list',
    params: {
      type,
      level,
      context,
      page_size,
      page_no
    }
  })
}

// 通过id获取题目信息
export function getQuestionById(question_id) {
  return ptRequest.get({
    url: '/teacher/question/detail',
    params: {
      question_id
    }
  })
}

// 添加题目
export function addQuestion(form) {
  const { question_name, type, level, create_user, question_option_list, answer, context, knp_id } = form
  // console.log( question_name, type, level, create_user, question_option_list, answer, context, knp_id);
  return ptRequest.post({
    url: '/teacher/question',
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

// 删除题目
export function deleteQuestion(question_id) {
  return ptRequest.delete({
    url: '/teacher/question?question_id=' + question_id,
  })
}

// 更新题目
export function updataQuestion(form) {
  const { question_id, question_name, type, level, create_user, question_option_list, answer, context, knp_id } = form
  // console.log(question_id, question_name, type, level, create_user, question_option_list, answer, context, knp_id);

  return ptRequest.put({
    url: '/teacher/question',
    data: {
      question_id,
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