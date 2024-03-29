import { HTMLEncode } from '@/utils/htmlUtil'
import ptRequest from '../../request'

// 题目列表
export function getQuestionList(
  type,
  level,
  context,
  knp_id,
  page_size = 10,
  page_no = 1
) {
  return ptRequest.get({
    url: '/teacher/question/list',
    params: {
      type,
      level,
      context,
      knp_id,
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
  let {
    question_name,
    type,
    level,
    create_user,
    question_option_list,
    answer,
    answer_context,
    context,
    knp_id
  } = form

  // 如果 type==4 为填空题 type=5为简答题 需要富文本提交 对内容进行HTMLEncode加密
  if (type == 4 || type == 5) {
    answer = HTMLEncode(answer)
  }

  return ptRequest.post({
    url: '/teacher/question',
    data: {
      name: question_name,
      type,
      level,
      create_user: 'cs',
      question_option_list,
      answer,
      answer_context: HTMLEncode(answer_context),
      context: HTMLEncode(context),
      knp_id
    }
  })
}

// 删除题目
export function deleteQuestion(question_id) {
  return ptRequest.delete({
    url: '/teacher/question?question_id=' + question_id
  })
}

// 更新题目
export function updataQuestion(form) {
  let {
    answer,
    answer_context,
    context,
    create_user,
    knp_ids,
    knp_idStr,
    level,
    question_id,
    question_option,
    type
  } = form

  // 参数knp_id需要的字符串
  let knp_id = ''
  if (knp_idStr) {
    // 勾选有知识点
    knp_id = knp_idStr
    // console.log(knp_id, '1')
  } else {
    // 没勾选知识点 通过默认知识点的数组获取knp_id
    knp_ids.length ? (knp_id = knp_ids.join(',')) : (knp_ids = '')
    // console.log(knp_id, '2')
  }

  // 如果 type==4 为填空题 type=5为简答题 需要富文本提交 对内容进行HTMLEncode加密
  if (type == 4 || type == 5) {
    answer = HTMLEncode(answer)
  }

  // 接口的question_option_list字段与form解构出的字段不一样
  return ptRequest.put({
    url: '/teacher/question',
    data: {
      answer,
      answer_context: HTMLEncode(answer_context),
      context: HTMLEncode(context),
      create_user,
      knp_id,
      level,
      question_id,
      question_option_list: question_option,
      type
    }
  })
}
