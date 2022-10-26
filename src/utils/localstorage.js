export function setCache(key, value) {
    let json = typeof value === 'object'
    window.localStorage.setItem(key, JSON.stringify({
        isJson: json,
        value: json ? JSON.stringify(value) : value
    }))
}

export function getCache(key) {
    let data = JSON.parse(window.localStorage.getItem(key) || "{}")
    if (data.isJson) return JSON.parse(data.value)
    return data.value
}

export function getCacheObject() {
    let data = { ...window.localStorage }
    let res = {}
    Object.entries(data).forEach(([key, value]) => {
        Object.assign(res, {
            [key]: getCache(key)
        })
    })
    return res
}

export function clearCache(key) {
    if (!key) window.localStorage.clear()
    else window.localStorage.removeItem(key)
}