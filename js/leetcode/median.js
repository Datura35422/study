const arr = []
function Insert(num)
{
    // write code here
    const len = arr.length
    if (num > arr[len - 1]) {
        arr.push(num)
    } else if (num < arr[0]) {
        arr.unshift(num)
    } else {
        let i = len - 1
        while (i >= 0 && num < arr[i]) {
            i--
        }
        arr.splice(i + 1, 0, num)
    }
}
function GetMedian(){
	// write code here
    const len = arr.length
    if (len === 0) return
    return len & 1 ? arr[(len - 1) >> 1] : (arr[len >> 1] + arr[(len >> 1) + 1]) / 2
}

Insert(5)
console.log(GetMedian())

Insert(2)
console.log(GetMedian())