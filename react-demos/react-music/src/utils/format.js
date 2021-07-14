export function formatCount(count) {
  if (count < 0) {
    return
  }
  if (count < 10000) {
    return count
  } else if (count > 10000000) {
    return `${Math.ceil(count / 100000000)}亿`
  } else {
    return `${Math.ceil(count / 1000) / 10}万`
  }
} 

export function formatImgSize(url, width, height = width) {
  return url ? `${url}?param=${width}x${height}` : ''
}

export function formatDate(time, fmt) {
  const date = new Date(time)

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, String(date.getFullYear()).substring(4 - RegExp.$1.length))
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S+': date.getMilliseconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = String(o[k])
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length > 1 ? padLeftZero(str) : str)
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substring(str.length)
}

export function formatPlayUrl(id) {
  return id ? `https://music.163.com/song/media/outer/url?id=${id}.mp3` : ''
}
