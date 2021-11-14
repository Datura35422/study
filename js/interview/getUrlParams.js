function getUrlParam(sUrl, sKey) {
    const params = (sUrl.split('#')[0].split('?')[1] || '').split('&')
    let res = {}
    if (params.length > 0) {
        params.forEach(item => {
            const [key, value] = item.split('=')
            if (typeof res[key] === 'undefined') { // 如果res中不存在key
                res[key] = value
            } else if (Array.isArray(res[key])) { // 如果存在多个
                // Object.prototype.toString.call(res[key]) === "[object Array]" 或者 res[key] instanceof Array
                res[key].push(value)
            } else if (typeof res[key] === 'string') { // 如果已存在且同名
                res[key] = [res[key], value]
            }
        })
        return sKey ? (res[sKey] || '') : res
    }
    return res
}

console.log(getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&key=4&test=4#hehe', 'key'))