import sxRequest from '../../request'

export function getReviewClasses(data) {
    return sxRequest.get({
        url: '/teacher/review/class',
        params: {
            ...data
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