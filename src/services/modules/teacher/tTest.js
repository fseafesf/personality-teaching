import sxRequest from '../../request'

export async function getPageList(cookie, page = 1, page_size = 10) {
    return sxRequest.get({
        url: '/teacher/exam/list',
        params: {
            page,
            page_size
        }
    })
        .then(res => res)
        .catch(err => err)
}

export function createPage(data) {
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

// 查询试卷
export function searchPage(data) {
    return sxRequest.get({
        url: '/teacher/exam',
        params: {
            exam_id: data
        }
    })
}

//修改试卷
export function modifyPage(data) {
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