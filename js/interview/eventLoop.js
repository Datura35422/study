// -----------------------------------1-------------------------------
// async function async1() {
//     console.log('async1 start')
//     await async2()
//     console.log('async1 end')
// }

// async function async2() {
//     console.log('async2')
// }

// console.log('script start')
// setTimeout(function() {
//     console.log('setTimeout')
// }, 0)
// async1()
// new Promise(function(resolve) {
//     console.log('promise1');
//     resolve()
// }).then(function() {
//     console.log('promise2')
// })
// console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// ----------------------------2-----------------------------------

console.log('start')
setTimeout(() => {
    console.log('children2')
    Promise.resolve().then(() => {
        console.log('children3')
    })
}, 0)
new Promise(function (resolve, reject) {
    console.log('children4')
    setTimeout(function() {
        console.log('children5')
        resolve('children6')
    }, 0)
}).then((res) => {
    console.log('children7')
    setTimeout(() => {
        console.log(res)
    }, 0)
})

// start     -- 第一轮宏任务
// children4
// children2 -- 第二轮宏任务
// children3
// children5
// children7
// children6 -- 第三轮宏任务

// --------------------------------3-----------------------------

// const p = function() {
//     return new Promise((resolve, reject) => {
//         const p1 = new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(1)
//             }, 0)
//             resolve(2)
//         })
//         p1.then((res) => {
//             console.log(res)
//         })
//         console.log(3)
//         resolve(4)
//     })
// }

// p().then(res => {
//     console.log(res)
// })
// console.log('end')

// 3
// end
// 2  -- 开始清空微任务队列
// 4

// var p = Promise.resolve(21)

// p.then(function(v) {
//     console.log(v)
    
//     // 创建一个promise并将其返回
//     return new Promise(function(resolve, reject) {
//         resolve(v * 2)
//     })
// }).then(function(v) {
//     console.log(v)
// })