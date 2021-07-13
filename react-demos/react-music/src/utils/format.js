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
  return `${url}?param=${width}x${height}`
}