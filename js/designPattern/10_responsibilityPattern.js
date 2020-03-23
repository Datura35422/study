// 职责链模式
// 使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，讲这些对象连成一条链，并沿着这条链传递该请求，知道有一个对象处理它为止。
// 优点：请求发送者只需要知道链中的第一个节点，从而弱化了发送者和一组接受者之间的强联系。
// 缺点：滥用的话会造成性能损耗。

var order500 = function( orderType, pay, stock ){
  if ( orderType === 1 && pay === true ){
    console.log( '500 元定金预购，得到 100 优惠券' );
  }else{
    return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};
var order200 = function( orderType, pay, stock ){
  if ( orderType === 2 && pay === true ){
    console.log( '200 元定金预购，得到 50 优惠券' );
  }else{
    return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};
var orderNormal = function( orderType, pay, stock ){
  if ( stock > 0 ){
    console.log( '普通购买，无优惠券' );
  }else{
    console.log( '手机库存不足' );
  }
}; 
// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
// Chain.prototype.passRequest 传递请求给某个节点
var Chain = function( fn ){
  this.fn = fn;
  this.successor = null;
};
Chain.prototype.setNextSuccessor = function( successor ){
  return this.successor = successor;
};
Chain.prototype.passRequest = function(){ 
  var ret = this.fn.apply( this, arguments );
  if ( ret === 'nextSuccessor' ){
    return this.successor && this.successor.passRequest.apply( this.successor, arguments );
  }
  return ret;
}; 
var chainOrder500 = new Chain( order500 );
var chainOrder200 = new Chain( order200 );
var chainOrderNormal = new Chain( orderNormal ); 
// 然后指定节点在职责链中的顺序：
chainOrder500.setNextSuccessor( chainOrder200 );
chainOrder200.setNextSuccessor( chainOrderNormal );
// 最后把请求传递给第一个节点：
chainOrder500.passRequest( 1, true, 500 ); // 输出：500 元定金预购，得到 100 优惠券
chainOrder500.passRequest( 2, true, 500 ); // 输出：200 元定金预购，得到 50 优惠券
chainOrder500.passRequest( 3, true, 500 ); // 输出：普通购买，无优惠券
chainOrder500.passRequest( 1, false, 0 ); // 输出：手机库存不足

// 异步的职责链
// Chain.prototype.next，表示手动传递请求给职责链中的下一个节点：
Chain.prototype.next= function(){
  return this.successor && this.successor.passRequest.apply( this.successor, arguments );
 };
//  异步职责链的例子：
var fn1 = new Chain(function(){
  console.log( 1 );
  return 'nextSuccessor';
});
var fn2 = new Chain(function(){
  console.log( 2 );
  var self = this;
    setTimeout(function(){
    self.next();
  }, 1000 );
});
var fn3 = new Chain(function(){
  console.log( 3 );
});
fn1.setNextSuccessor( fn2 ).setNextSuccessor( fn3 );
fn1.passRequest(); 

// 用AOP实现职责链
Function.prototype.after = function( fn ){
  var self = this;
  return function(){
    var ret = self.apply( this, arguments );
    if ( ret === 'nextSuccessor' ){
      return fn.apply( this, arguments );
    }
    return ret;
  }
};
var order = order500yuan.after( order200yuan ).after( orderNormal );
order( 1, true, 500 ); // 输出：500 元定金预购，得到 100 优惠券
order( 2, true, 500 ); // 输出：200 元定金预购，得到 50 优惠券
order( 1, false, 500 ); // 输出：普通购买，无优惠券
// 叠加了函数的作用域，如果链条太长的话，也会对性能有较大的影响。
