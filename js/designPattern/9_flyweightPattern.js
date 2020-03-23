// 享元模式
// 是一种用于性能优化的模式。享元模式的核心是运用共享技术来有效支持大量细粒度的对象。
// 享元模式要求将对象的属性划分为内部状态与外部状态（属性）
// 享元模式的目标是尽量减少共享对象的数量。

// 如何划分内部状态和外部状态
// 1.内部状态存储于对象内部
// 2.内部状态可以被一些对象共享
// 3.内部状态独立于具体的场景, 通常不会改变
// 4.外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享
// 这样我们便可以吧所有内部状态相同的对象都指定为同一个共享的对象。而外部状态可以从对象身上剥离出来，并存储在外部。
// 剥离了外部状态的对象成为共享对象，外部状态在必要时被传入共享对象来组装成一个完整的对象。
// 享元模式是一种用时间换空间的优化模式。

// 享元模式的适用性(使用场景)
// 1.一个程序中使用了大量的相似对象。
// 2.由于使用了大量对象，造成很大的内存开销。
// 3.对象的大多数状态都可以变为外部状态。
// 4.剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。

// 假设有个内衣工厂，目前的产品有 50 种男式内衣和 50 种女士内衣，为了推销产品，工厂决
// 定生产一些塑料模特来穿上他们的内衣拍成广告照片
var Model = function( sex ){
  this.sex = sex;
};
Model.prototype.takePhoto = function(){
  console.log( 'sex= ' + this.sex + ' underwear=' + this.underwear);
};
//  分别创建一个男模特对象和一个女模特对象：
var maleModel = new Model( 'male' ),
  femaleModel = new Model( 'female' );
// 给男模特依次穿上所有的男装，并进行拍照：
for ( var i = 1; i <= 50; i++ ){
  maleModel.underwear = 'underwear' + i;
  maleModel.takePhoto();
};
// 同样，给女模特依次穿上所有的女装，并进行拍照：
for ( var j = 1; j <= 50; j++ ){
  femaleModel.underwear = 'underwear' + j;
  femaleModel.takePhoto();
}; 

// 对象池：对象池维护一个装载空闲对象的池子，如果需要对象的时候，不是直接 new，而是转从对象池里获取。
// 如果对象池里没有空闲对象，则创建一个新的对象，当获取出的对象完成它的职责之后， 再进入池子等待被下次获取。
// 与享元模式相似，但是没有内外状态之分

// 实现一个通用的对象池
var objectPoolFactory = function( createObjFn ){
  var objectPool = [];
  return {
    create: function(){
      var obj = objectPool.length === 0 ?
      createObjFn.apply( this, arguments ) : objectPool.shift();
      return obj;
    },
    recover: function( obj ){
      objectPool.push( obj ); 
    }
  }
};
// 现在利用 objectPoolFactory 来创建一个装载一些 iframe 的对象池：
var iframeFactory = objectPoolFactory( function(){
  var iframe = document.createElement( 'iframe' );
  document.body.appendChild( iframe );
  iframe.onload = function(){
    iframe.onload = null; // 防止 iframe 重复加载的 bug
    iframeFactory.recover( iframe ); // iframe 加载完成之后回收节点
  }
  return iframe;
});
var iframe1 = iframeFactory.create();
iframe1.src = 'http:// baidu.com';
var iframe2 = iframeFactory.create();
iframe2.src = 'http:// QQ.com';
setTimeout(function(){
  var iframe3 = iframeFactory.create();
  iframe3.src = 'http:// 163.com';
}, 3000 ); 
