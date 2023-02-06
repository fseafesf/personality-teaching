import sxRequest from '../../request'

export function getReviewClasses(exam_id) {
    return sxRequest.get({
        url: '/teacher/review/class',
        params: {
            exam_id
        }
    })
}

export function getReviewStudents({class_id,exam_id}) {
    return sxRequest.get({
        url: '/teacher/review/student/list',
        params:{
            class_id,
            exam_id
        }
    })
}

export function getStudentsAnswer({exam_id,student_id}) {
    return sxRequest.get({
        url: '/teacher/review/student',
        params:{
            exam_id,
            student_id
        }
    })
}

export function updateReview(data) {
    return sxRequest.put({
        url: '/teacher/review',
        data
    })
}