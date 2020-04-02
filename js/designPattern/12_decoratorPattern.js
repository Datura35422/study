// 装饰者模式
// 装饰者模式可以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。
// 装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。
// 装饰者模式将一个对象嵌入另一个对象包装起来，形成一条包装链。请求随着这条链依次传递到所有的对象，每个对象都有处理这条请求的机会。

// 用AOP装饰函数(作用：松耦合高复用)
// 首先给出 Function.prototype.before 方法和 Function.prototype.after 方法：
Function.prototype.before = function( beforefn ){
  var __self = this; // 保存原函数的引用
  return function(){ // 返回包含了原函数和新函数的"代理"函数
    beforefn.apply( this, arguments ); // 执行新函数，且保证 this 不被劫持，新函数接受的参数
    // 也会被原封不动地传入原函数，新函数在原函数之前执行
    return __self.apply( this, arguments ); // 执行原函数并返回原函数的执行结果，
    // 并且保证 this 不被劫持
  }
}
// Function.prototype.before 接受一个函数当作参数，这个函数即为新添加的函数，它装载了新添加的功能代码。
Function.prototype.after = function( afterfn ){
  var __self = this;
  return function(){
    var ret = __self.apply( this, arguments );
    afterfn.apply( this, arguments );
    return ret;
  }
}; 
// 接下来把当前的 this 保存起来，这个 this 指向原函数，然后返回一个“代理”函数，这个
// “代理”函数只是结构上像代理而已，并不承担代理的职责（比如控制对象的访问等）。它的工作
// 是把请求分别转发给新添加的函数和原函数，且负责保证它们的执行顺序，让新添加的函数在原
// 函数之前执行（前置装饰），这样就实现了动态装饰的效果。

// 应用场景：分离业务和数据统计
// 普通写法：
var showLogin = function(){
  console.log( '打开登录浮层' );
  log( this.getAttribute( 'tag' ) );
}
var log = function( tag ){
  console.log( '上报标签为: ' + tag );
  // (new Image).src = 'http:// xxx.com/report?tag=' + tag; // 真正的上报代码略
}
document.getElementById( 'button' ).onclick = showLogin;
// AOP改写后
Function.prototype.after = function( afterfn ){
  var __self = this;
  return function(){
    var ret = __self.apply( this, arguments );
    afterfn.apply( this, arguments );
    return ret;
  }
};
var showLogin = function(){
  console.log( '打开登录浮层' );
}
var log = function(){
  console.log( '上报标签为: ' + this.getAttribute( 'tag' ) );
}
showLogin = showLogin.after( log ); // 打开登录浮层之后上报数据
document.getElementById( 'button' ).onclick = showLogin; 