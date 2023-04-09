import ptRequest from "../../request"

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
        url:'/student/exam/upload',
        data
    })
}