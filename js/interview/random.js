/**
 * Moka前端团队的技术分享2周一次，一次2人
 *
 * 为了确定下一次是谁来分享，团队中引入了分享积分制，具体规则为：
 * 每个人都有一个积分，初始值是0。
 * 每次分享后所有人摇一轮骰子，点数作为积分累加到各自的积分中，骰子范围是1-12。
 * 积分最高的2个人将作为下一次的分享人。
 * 为了避免连续分享，某个人分享后他的积分会被清零且跳过本次的摇骰子环节。
 *
 * 如果积分最高的人数超过2人，则相同分数的人继续摇骰子，直到决出2个积分最高的人。需要注意的是，这期间摇骰子的积分也同样累积。
 *
 * 请你写一个程序模拟寻找下一次分享人这个过程
 */

// TODO
// 注意点： 人数不需要特殊处理（>= 2 人），骰子范围是（1-12），如果有相同积分的人（继续摇，注意积分累计，递归）

function randomMath() {
  return Math.floor(Math.random() * 12 + 1)
}

// 输入多少人参与 
function randomPeople(num, filterNum = 2, peo = null) {
  let people = peo // 编号：积分
  if (people === null) {
    people = []
    for (let i = 0; i < num; i++) {
      people[i] = {
        index: i,
        point: 0
      }
    }
  }
  // 开始摇骰子
  people = people.map(item => {
    item.point += randomMath()
    return item
  })
  // 查看结果 进行排序
  const point = []
  people.forEach(item => {
    point[item.point] = (point[item.point] || []).concat(item)
  })
  const pointMax = point.length
  let res = []
  const resArr = []
  let j = pointMax - 1
  // 从后往前找
  while (j > 0 && res.length < filterNum) {
    if (point[j]) {
      point[j].forEach(item => res.push(item))
      resArr.push(point[j])
    }
    j--
  }
  if (res.length > filterNum) {
    // 如果大于 filterNum 个人为最大值，则在最大值的数组中再来一轮
    if (resArr.length === 1) {
      return randomPeople(res.length, filterNum, res)
    } else {
      // 在多个次大值中确定最后的名额
      const newArr = resArr.pop()
      res = resArr.flat() // 在已确定的名额
      return res.concat(randomPeople(newArr.length, filterNum - res.length, newArr))
    }
  }
  return res
}
console.log('res: ', randomPeople(30, 6))