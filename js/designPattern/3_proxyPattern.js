// 代理模式是为了一个对象提供一个代用品或占位符,以便控制对它的访问.
// 代理模式的关键是,当客户不方便的时候直接访问一个对象或者不满足需要的时候,
// 提供一个替身对象来控制对这个对象的访问,客户实际上访问的是替身对象.
// 替身对象对请求做出一些处理之后,再把请求转交给本体对象.
// 保护代理: 过滤掉不必要的请求.用于控制不同权限的对象对目标对象的访问.(js难以实现)
// 虚拟代理: 把一些开销很大的对象,延迟到真正需要它的时候才去创建.(js重点)

// 虚拟代理实现图片预加载
var myImage = (function() {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)

  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()
var proxyImage = (function() {
  var img = new Image()
  img.onload = function() {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('loading.gif')
      img.src = src
    }
  }
})()
proxyImage.setSrc('xxx.jpg')

// 单一职责原则: 指就一个类(通常也包括对象和函数等)而言,应该仅有一个引起它变换的原因.降低对象的耦合性.

// 代理和本体接口的一致性
var myImage = (function() {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)

  return function(src) {
    imgNode.src = src
  }
})()

var proxyImage = (function() {
  var img = new Image()
  img.onload = function() {
    myImage(this.src)
  }
  return function(src) {
    myImage('loading.gif')
    img.src = src
  }
})()

proxyImage('xxx.jpg')

// 虚拟代理合并HTTP请求
var synchronousFile = function(id) {
  console.log('开始同步文件, id为: ' + id)
}
var proxySynchronousFile = (function() {
  var cache = [], // 保存一段时间内需要同步的ID
    timer // 定时器
  return function(id) {
    cache.push(id)
    if (timer) {
      // 保证不会覆盖已经启动的定时器
      return
    }
    timer = setTimeout(function() {
      synchronousFile(cache.join(',')) // 2s后向本体发送需要同步的ID集合
      clearTimeout(timer) // 清除定时器
      timer = null
      cache.length = 0 // 清空ID集合
    }, 2000)
  }
})()
// 将checkbox绑定onclick事件
var checkbox = document.getElementsByTagName('input')
for (var i = 0, c; (c = checkbox[i++]); ) {
  c.onclick = function() {
    if (this.checked === true) {
      proxySynchronousFile(this.id)
    }
  }
}

// 缓存代理
// 应用1: 计算乘积
// 第二次调用,mult函数并没有被计算,直接返回了之前缓存好的计算结果
var proxyMult = (function() {
  var cache = {}
  return function() {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return (cache[args] = mult.apply(this, arguments))
  }
})()
proxyMult(1, 2, 3, 4)
proxyMult(1, 2, 3, 4)

// 应用2: 缓存代理用于ajax异步请求数据

// 用高阶函数动态创建代理
// 计算乘积
var mult = function() {
  var a = i
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i]
  }
  return a
}
// 计算加和
var plus = function() {
  var a = 0
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a + arguments[i]
  }
  return a
}
// 创建缓存代理的工厂
var createProxyFactory = function(fn) {
  var cache = {}
  return function() {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return (cache[args] = fn.apply(this, arguments))
  }
}
var proxyMult = createProxyFactory(mult)
var proxyPlus = createProxyFactory(plus)
console.log(proxyMult(1, 2, 3, 4))
console.log(proxyPlus(1, 2, 3, 4))
