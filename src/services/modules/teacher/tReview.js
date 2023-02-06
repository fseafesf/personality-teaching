import sxRequest from '../../request'

export function getReviewClasses(exam_id) {
    console.log(exam_id)
    return sxRequest.get({
        url: '/teacher/review/class',
        params: {
            exam_id
        }
    })
}

export function getReviewStudents(data) {
    return sxRequest.get({
        url: '/teacher/review/student/list',
        data
    })
}

export function getStudentsAnswer(data) {
    return sxRequest.get({
        url: '/teacher/review/student',
        data
    })
}

export function updateReview(data) {
    return sxRequest.put({
        url: '/teacher/review',
        data
    })
}