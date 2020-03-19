// 单例模式: 保证一个类仅有一个实例,并提供一个访问它的全局访问点
// 例如: 某些对象只需要一个,如线程池,全局缓存,window对象等

// 用一个变量来标志当前是否已经为某个类创建过对象
// 实现1
var Singleton = function(name) {
  this.name = name
  this.instance = null
}

Singleton.prototype.getName = function() {
  console.log(this.name)
}

Singleton.getInstance = function(name) {
  if (!this.instance) {
    this.instance = new Singleton(name)
  }
  return this.instance
}

var a = Singleton.getInstance('test1')
var b = Singleton.getInstance('test2')
console.log('Singleton1', a === b)

// 实现2
var Singleton = function(name) {
  this.name = name
}

Singleton.prototype.getName = function() {
  console.log(this.name)
}
// 惰性单例: 指在需要的时候才创建对象实例.在调用的时候才创建实例,而不是页面加载好的时候就创建
Singleton.getInstance = (function() {
  var instance = null
  return function(name) {
    if (!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()

var a = Singleton.getInstance('test1')
var b = Singleton.getInstance('test2')
console.log('Singleton2', a === b)

// 优化
// 透明的单例模式: 用户从这个类中创建对象的时候,可以像使用其他任何普通类一样
// 但是使用了自执行的匿名函数和闭包,增加了程序的复杂度和可读性降低
// var CreateDiv = (function () {
//   var instance
//   var CreateDiv = function (html) {
//     if (instance) {
//       return instance
//     }
//     this.html = html
//     this.init()
//     return instance = this
//   }
//   CreateDiv.prototype.init = function () {
//     var div = document.createElement('div')
//     div.innerHTML = this.html
//     document.body.appendChild(div)
//   }

//   return
// })()
// var a = new CreateDiv('test3')
// var b = new CreateDiv('test4')
// console.log(a === b) // true

// 优化以上代码
// 用代理实现单例模式
// var CreateDiv = function(html){
//   this.html = html
//   this.init()
// }

// CreateDiv.prototype.init = function(){
//   var div = documet.createElement('div')
//   div.innerHTML = this.html
//   document.body.appendChild(div)
// }
// // 处理单例逻辑
// var ProxySingletonCreateDiv = (function(){
//   var instance
//   return function(html){
//     if(!instance){
//       instance = new CreateDiv(html)
//     }
//     return instance
//   }
// })()

// var a = new ProxySingletonCreateDiv('test5')
// var b = new ProxySingletonCreateDiv('test6')
// console.log(a === b) // true

// 单例模式的核心是确保只有一个实例,并提供全局访问.
// 避免设置全局变量
// 1. 使用命名空间
var MyApp = {}
MyApp.namespace = function(name) {
  var parts = name.split('.')
  var current = MyApp
  for (var i in parts) {
    if (!current[parts[i]]) {
      current[parts[i]] = {}
    }
    current = current[parts[i]]
  }
}
MyApp.namespace('event')
MyApp.namespace('dom.style')

// 等价于
var MyApp = {
  event: {},
  dom: {
    style: {}
  }
}

// 2.使用闭包封装私有变量
var user = (function() {
  var __name = 'test',
    __age = 29
  return {
    getUserInfo: function() {
      return __name + '-' + __age
    }
  }
})()
