function findMax(m, n) {
    const arr = Number(m).toString().split('')
    let index = 0
    let winStart = 0
    let winLen = n + 1 // 当前窗口的宽度
    let winMax = 0 // 当前窗口的最大值
    let res = [] // 结果
    while (winLen > 1 && index < arr.length) { // 当窗口里面只有一个的时候  不需要找到最大值了
        winMax = arr[index] // 当前窗口最大值
        winStart = index // 当前窗口开始索引
        for (let i = index; i < winStart + winLen; i++) {
            if (arr[i] > winMax) {
                winMax = arr[i]
                index = i
            }
        }
        // 找到当前窗口的最大值 最大值索引 index
        res.push(winMax) // 当前窗口的最大值
        winLen = index !== winStart ? winLen - (index - winStart) : winLen // 如果有删除数字 则窗口缩小
        index = index + 1 // 从下一个数开始遍历
    }
    return Number(res.concat(arr.slice(index)).join(''))
}

console.log(findMax(349869, 3)) // 989

console.log(findMax(92837451, 3)) // 98751

console.log(findMax(1234567, 3))