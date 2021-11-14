const queue = []
const map = new Map()

function Insert(ch)
{
    // write code here
    queue.push(ch)
    map.has(ch) ? map.set(ch, map.get(ch) + 1) : map.set(ch, 1)
    while (queue.length !== 0 && map.get(queue[0]) > 1) {
        queue.shift()
    }
}
//return the first appearence once char in current stringstream
function FirstAppearingOnce()
{
    // write code here
    return queue.length === 0 ? '#' : queue[0]
}

const testStr = 'helloworld'
for (let i = 0; i < testStr.length; i++) {
    Insert(testStr.charAt(i))
    console.log(FirstAppearingOnce())
}