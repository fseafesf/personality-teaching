import sxRequest from '../../request'

export async function getPageList(cookie, data) {
    return sxRequest.get({
        url: '/teacher/exam/list',
        params: {
            ...data
        }
    })
        .then(res => res)
        .catch(err => err)
}

export function createPage(cookie, data) {
    return sxRequest.post({
        url: `/teacher/exam`,
        headers: {
            'Cookie': `session_key=${cookie}`,
        },
        data
    })
        .then(res => res)
        .catch(err => err)
}

export function deletePage(cookie, data) {
    return sxRequest.delete({
        url: '/teacher/exam',
        headers: {
            'Cookie': `session_key=${cookie}`
        },
        params: {
            exam_id: data
        }
    })
}

export function searchPage(cookie, data) {
    return sxRequest.get({
        url: '/teacher/exam',
        headers: {
            'Cookie': `session_key=${cookie}`
        },
        params: {
            exam_id: data
        }
    })
}

export function modifyPage(cookie, data) {
    return sxRequest.put({
        url: '/teacher/exam',
        headers: {
            'Cookie': `session_key=${cookie}`
        },
        data
    })
}
export function releasePageClass(cookie, data) {
    return sxRequest.post({
        url: '/teacher/exam/send/2',
        headers: {
            'Cookie': `session_key=${cookie}`
        },
        data
    })
}

export function releasePageStudent(cookie, data) {
    return sxRequest.post({
        url: '/teacher/exam/send/1',
        headers: {
            'Cookie': `session_key=${cookie}`
        },
        data
    })
}