// curry(柯里化): 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
// 可以一次性的调用curry函数，也可以每次只穿一个参数分多次调用。

// 定义一个add函数，它接受一个参数并返回一个新的函数
// 返回的新函数通过闭包的方式记住了add的第一个参数
var add = function(x) {
  return function(y) {
    return x + y
  }
}
var increment = add(1)
var addTen = add(10)
increment(2) // 3
addTen(2) // 12

// 高阶函数：参数或返回值为函数的函数