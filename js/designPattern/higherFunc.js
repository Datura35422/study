// 高阶函数: 函数可以作为参数被传递或函数可以作为返回值输出
// 函数作为参数被传递: 1.回调函数 2.Array.prototype.sort,封装了数组元素的排序规则
// 函数作为返回值输出: 1.判断数据的类型, 2.单例模式getSingle
var isType = function(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }
}
var isString = isType('String')
var isArray = isType('Array')
var isNumber = isType('Number')
console.log(isArray([1, 2, 3]))

// 单例模式:既把函数当做参数传递,又让函数执行后返回了另外一个函数
var getSingle = function(fn) {
  var ret
  return function() {
    return ret || (ret = fn.apply(this, arguments))
  }
}

// 高阶函数实现AOP(装饰者模式)
// AOP(面向切面编程): 主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来
// 把一个函数'动态织入'到另一个函数之中
Function.prototype.before = function(beforefn) {
  var __self = this // 保存原函数的引用
  return function() {
    // 返回包含了原函数和新函数的"代理"函数
    beforefn.apply(this, arguments) // 执行新代理函数,修正this
    return __self.apply(this, arguments) // 执行原函数
  }
}

Function.prototype.after = function(afterfn) {
  var __self = this
  return function() {
    var ret = __self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}

var func = function() {
  console.log(2)
}

func = func
  .before(function() {
    console.log('beforefn', 1)
  })
  .after(function() {
    console.log('afterfn', 3)
  })

func()

// 高阶函数的应用
// 应用1. curring(函数柯里化),部分求值
// 一个curring的函数首先会接受一些参数,接受了这些参数之后,该函数并不会立即求值,
// 而是继续返回另外一个函数,刚才传入的参数在函数形成的闭包中被保存下来
// 带到函数被真正需要求值的时候,之前传入的所有参数都会被一次性用于求值
// 例如: 计算每月开销.在每天结束之前,都要记录今天花掉了多少钱
var monthlyCost = 0
var cost = function(money) {
  monthlyCost += money
}
cost(100) // 第一天开销
cost(200) // 第二天开销
cost(300) // 第三天开销
console.log('monthlyCost', monthlyCost)
// 使用curring改写, 只需要在月底的时候计算一次
var currying = function(fn) {
  var args = []
  return function() {
    if (arguments.length === 0) {
      return fn.apply(this, args)
    } else {
      ;[].push.apply(args, arguments)
      return arguments.callee
    }
  }
}

var cost = (function() {
  var money = 0
  return function() {
    for (var i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i]
    }
    return money
  }
})()

cost = currying(cost) // 转化为currying函数
cost(100) // 未真正求值,仅记录每天开销
cost(200)
cost(300)
console.log('monthlyCost currying', cost()) // 月底计算,整个月的开销

// 应用2: uncurrying(鸭子类型思想)
Function.prototype.uncurrying = function() {
  var self = this // Function.prototype.apply
  return function() {
    // arguments={
    //   '0': [Function: fn],
    //   '1': { name: 'sven' },
    //   '2': [ 1, 2, 3 ]
    // }
    var obj = Array.prototype.shift.call(arguments)
    // obj = arguments[0]
    return self.apply(obj, arguments)
    // arguments = { '0': { name: 'sven' }, '1': [ 1, 2, 3 ] }
    // Function.prototype.apply.apply(fn, arguments)
    // 循环执行了两边apply
  }
}
var apply = Function.prototype.apply.uncurrying()
var fn = function(name) {
  console.log('uncurrying name', this.name, name) // this.name = sven, name = 1
  console.log('uncurrying arguments', arguments) // {0: 1, 1: 2, 2: 3}
}
apply(fn, { name: 'sven' }, [1, 2, 3])

// 应用3: 函数节流,减少性能损耗
// 函数被频繁调用场景: 1. window.onresize事件, 2. mousemove事件, 3. 上传进度等
// throttle函数原理: 将即将被执行的函数setTimeout延迟一段事件执行,如果该次延迟执行还没有完成,则忽略接下来调用该函数的请求
var throttle = function(fn, interval) {
  var __self = fn, // 保存需要被延迟执行的函数引用
    timer, // 定时器
    firstTime = true // 是否是第一次调用
  return function() {
    var args = arguments,
      __me = this

    if (firstTime) {
      // 如果是第一次调用,不需延迟执行
      __self.apply(__me, args)
      return (firstTIme = false)
    }

    if (timer) {
      // 如果定时器还在,说明前一次延迟执行还没有完成
      return false
    }
    timer = serTimeout(function() {
      // 延迟一段时间执行
      clearTimeout(timer)
      timer = null
      __self.apply(__me, args)
    }, interval || 500)
  }
}

// 应用4: 分时函数
// 在短时间内获取大量的数据并渲染会严重地影响页面性能
// 参数: ary创建节点需要的数据, fn为创建节点的函数, count一次性创建节点数量
var timeChunk = function(ary, fn, count) {
  var obj, t
  var len = ary.length
  var start = function() {
    for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
      var obj = ary.shift()
      fn(obj)
    }
  }

  return function() {
    t = setInterval(function() {
      if (ary.length === 0) {
        // 如果全部节点都已经被创建好
        return clearInterval(t)
      }
      start()
    }, 200) // 分批执行的时间间隔,也可以用参数的形式传入
  }
}

var ary = []
for (var i = 0; i < 1000; i++) {
  ary.push(i)
}
var renderFriendList = timeChunk(
  ary,
  function(n) {
    // console.log('renderFriendList', n)
  },
  8
)
renderFriendList()

// 应用5: 惰性加载数据
// 嗅探工作, 浏览器兼容
// 第一次运行addEvent函数会进行重写后,第二次调用就不会再进行重写
var addEvent = function(elem, type, handle) {
  if (window.addEventListener) {
    addEvent = function(elem, type, handle) {
      elem.addEventListener(type, handle, false)
    }
  } else if (window.attachEvent) {
    addEvent = function(elem, type, handle) {
      elem.attachEvent('on' + type, handle)
    }
  }
  addEvent(elem, type, handle)
}
// addEvent(document.getElementId('#btn'), 'click', function(){console.log('click')})
