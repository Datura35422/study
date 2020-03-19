// 迭代器模式: 指提供一种方法顺序访问一个聚合对象中的各个元素, 而又不需要暴露该对象的内部表示
// 迭代器模式可以把迭代的过程从业务逻辑中分离出来,在使用迭代器模式之后,即使不关心对象的内部构造,也可以按顺序访问其中的每个元素.
// js自带迭代器: Array.prototype.forEach

// 实现简单的迭代器
var each = function (ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i]) // 把下标和元素当作参数传给callback函数
  }
}
each([1, 2, 3], function (i, n) {
  console.log([i, n])
})

// 迭代器可以分为内部迭代器和外部迭代器
// 内部迭代器: 函数内部已经定义好迭代规则(如each函数)
// 外部迭代器: 必须显示的请求迭代下一个元素

// 迭代类数组对象和字面量对象
// js中for...in可以用来迭代普通字面量对象的属性
// jq中提供$.each函数来封装各种迭代行为
$.each = function(obj, callback) {
  var value,
  i = 0,
  length = obj.length,
  isArray = isArraylike(obj)

  if (isArray) { // 迭代类数组
    for(; i < length; i++){
      value = callback.call(obj[i], i, obj[i])
      if (value === false) {
        break
      }
    }
  } else {
    for (i in obj) { // 迭代object对象
      value = callback.call(obj[i], i, obj[i])
      if (value === false) {
        break
      }
    }
  }
  return obj
}

// 倒序迭代器
// 迭代器模式提供了循环访问一个聚合对象中每个元素的方法
var reverseEach = function(ary, callback) {
  for (var l = ary.lrngth - 1; l >= 0; l--) {
    callback(l, ary[l])
  }
}
reverseEach([0, 1, 2], function(i, n) {
  console.log(n)
})