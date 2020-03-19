// 变量作用域: 指变量的有效范围.变量的搜索是从内到外的.
// 变量的生存周期: 全局变量永久存在,局部变量会随着函数调用的结束而被销毁.
// 闭包结构可以使局部变量的生命被延续

// 简单的闭包
var func = function () {
  var a = 1;
  return function () {
    a++
    console.log('f()', a)
  }
}
var f = func()
f() // 2
f() // 3
f() // 4

// 闭包的作用
// 1. 封装变量
// 返回乘积,增加缓存,减少相同参数计算浪费
var mult = (function () {
  var cache = {}
  return function () {
    // arguments具有array的属性和方法
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    var a = 1
    for (var i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i]
    }
    return cache[args] = a
  }
})()
// 以上代码进行优化封装.如果小函数不需要在程序的其他地方使用,最好是将它们用闭包封闭起来.
var multOptimization = (function () {
  var cache = {}
  var calculate = function () { // 封闭calculate函数
    var a = 1
    for (var i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i]
    }
    return a
  }
  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = calculate.apply(null, arguments)
  }
})()

console.log('multOptimization', multOptimization(1, 2, 3))

// 2. 延续局部变量的寿命
// 解决请求丢失问题
var report = (function () {
  var imgs = []
  return function (src) {
    imgs.push(src)
    console.log('report', imgs)
  }
})()
report('imgurl.png')


// 闭包和面向对象设计
// 闭包实现
var extentClosure = function () {
  var value = 0
  return {
    call: function () {
      value++
      console.log('extentClosure', value)
    }
  }
}
var extend = extentClosure()
extend.call()
extend.call()
// 面向对象实现
var extendClass = {
  value: 0,
  call: function () {
    this.value++
    console.log('extendClass', this.value)
  }
}
extend = extendClass
extend.call()
extend.call()
// 面向对象实现2,原型链方式
var Extend = function () {
  this.value = 0
}
Extend.prototype.call = function () {
  this.value++
  console.log('extendClass2', this.value)
}
extend = new Extend()
extend.call()
extend.call()