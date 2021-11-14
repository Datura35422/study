/**
 * acm 模式 界面输入和输出
 */
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let k = 0
let strArr = []

rl.on('line', line => {
    if (!isNaN(Number(line)) && k === 0) {
        k = Number(line)
    } else if (k > 0) {
        strArr.push(line)
    }
    if (strArr.length === k) {
        console.log(k, strArr)
        rl.close()
    }
});

function checkStr(k, strArr) {
    for (let i = 0; i < k; i++) {
        let item = strArr[i]
        for (let j = 0; j < item.length; j++) {
            
        }
    }
}