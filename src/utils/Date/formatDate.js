export function formDate(d) {
    let date = new Date(d)
    let YY = date.getFullYear() + '-';
    let MM =
        (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-';
    let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let hh =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let mm =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':';
    let ss =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return YY + MM + DD + ' ' + hh + mm + ss;
}

export function getToday() {
    let date = new Date()
    let YY = date.getFullYear();
    let MM = date.getMonth();
    let DD = date.getDate();
    let hh = date.getHours();
    let mm = date.getMinutes();
    return [new Date(YY, MM, DD, hh, mm), new Date(YY, MM, DD + 1, hh, mm)]
}