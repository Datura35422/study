/**
 * 滚动区域 自动滚动
 * @param {node} element 
 * @param {number} to 
 * @param {number} duration 
 * @returns 
 */
export function scrollTo(element, to, duration) {
  if (duration <= 0) return                       // 退出递归
  const difference = to - element.scrollTop       // 计算滚动区域总距离差
  const perTick = difference / duration * 10      // 每10ms滚动距离

  setTimeout(() => {
      element.scrollTop = element.scrollTop + perTick // 设置滚动距离
      // 如果滚动距离等于目标距离 退出自动滚动
      if (element.scrollTop === to) return
      // 继续滚动 递归 每 10 ms 进行滚动一次
      scrollTo(element, to, duration - 10)
  }, 10)
}