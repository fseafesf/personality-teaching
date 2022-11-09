import sxRequest from '../../request'

export async function getPageList(cookie,data) {
    return sxRequest.get({
        url: '/teacher/exam/list',
        headers: {
            'Cookie': `session_key=${cookie}`,
        },
        params:{
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