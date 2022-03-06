const promise1 = new Promise((resolve, reject) => {
  // console.log('promise')
  setTimeout(() => {
    reject('res')
  }, 1000)
})

const promise2 = new Promise((resolve, reject) => {
  // console.log('promise')
  setTimeout(() => {
    resolve('res')
  }, 1000)
})

// console.log('2')

// promise1.then((res)=> {
//   console.log('then: ', res)
//   return Promise.reject(1)
// }).catch((e) => {
//   console.log('catch: ', e)
// })

// const await1 = async() => {
//   await Promise.reject(1)
// }
// await1().then(res => {
//   console.log('await: ', res)
// }).catch(e => {
//   console.log('err: ', e)
// })

promise1.catch(err => {
  console.log('err: ', err);
  return Promise.reject(1);
}).then(() => {
  console.log('promise1')
  return promise2
}).then(() => {
  console.log('promise2')
}).catch(err => {
  console.log('err2: ', err)
})