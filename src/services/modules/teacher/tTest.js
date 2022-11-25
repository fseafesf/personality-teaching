import sxRequest from '../../request'

export async function getPageList(cookie, page = 1, page_size = 10) {
    return sxRequest.get({
        url: '/teacher/exam/list',
        // headers: {
        //     'Cookie': `session_key=${cookie}`,
        // },
        params: {
            page,
            page_size
        }
    })
        .then(res => res)
        .catch(err => err)
}

export function createPage(cookie, data) {
    return sxRequest.post({
        url: `/teacher/exam`,
        data
    })
        .then(res => res)
        .catch(err => err)
}

export function deletePage(cookie, data) {
    return sxRequest.delete({
        url: '/teacher/exam',
        params: {
            exam_id: data
        }
    })
}

export function search(cookie, data) {
    return sxRequest.post({
        url: '/teacher/exam/search',
        data
    })
}

export function searchPage(cookie, data) {
    return sxRequest.get({
        url: '/teacher/exam',
        params: {
            exam_id: data
        }
    })
}

export function modifyPage(cookie, data) {
    return sxRequest.put({
        url: '/teacher/exam',
        data
    })
}
export function releasePageClass(data) {
    return sxRequest.post({
        url: '/teacher/exam/send/2',
        data
    })
}

export function releasePageStudent( data) {
    return sxRequest.post({
        url: '/teacher/exam/send/1',
        data
    })
}