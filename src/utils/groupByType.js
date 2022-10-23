export function group(arr) {
    let result = [];
    let map = {};
    for (let item of arr) {
        let { type } = item
        if (!map[type]) {
            result.push({
                type,
                data: [item]
            })
            map[type] = item
        }
        else {
            for (let i = 0; i < result.length; i++) {
                let typeObject = result[i];
                if (typeObject.type === type) {
                    typeObject.data.push(item)
                    break;
                }
            }
        }
    } return result.sort((a, b) => {
        return a.type - b.type
    })
}

export function groupByType(arr) {
    let map = {}
    for (let item of arr) {
        let { type: T } = item
        if (!map[T]) {
            map[T] = [];
            map[T].push(item)
        }
        else {
            map[T].push(item)
        }
    }
    return map
}

/* export function singleType(arr, type) {
    let result = arr.filter((item) => {
        return item.type === type
    })
    return result
} */