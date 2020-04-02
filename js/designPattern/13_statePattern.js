// 状态模式的定义：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类
// 状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变
// 把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部
// 可以使每一种状态和它对应的行为之间的关系局部化，这些行为被分散和封装在各自对应的状态类之中，便于阅读和管理代码

// 状态模式的优缺点
// 优点：
// 状态模式定义了状态与行为之间的关系，并将它们封装在一个类里。通过增加新的状态类，很容易增加新的状态和转换
// 避免Context无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了Context中原本过多的条件分支
// 用对象代替字符串来记录当前状态，使得状态的切换更加一目了然
// Context中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响
// 缺点：
// 逻辑分散，会定义很多状态类

// OffLightState：
var OffLightState = function( light ){
  this.light = light;
};
OffLightState.prototype.buttonWasPressed = function(){
  console.log( '弱光' ); // offLightState 对应的行为
  this.light.setState( this.light.weakLightState ); // 切换状态到 weakLightState
};
// WeakLightState：
var WeakLightState = function( light ){
  this.light = light;
};
WeakLightState.prototype.buttonWasPressed = function(){
  console.log( '强光' ); // weakLightState 对应的行为
  this.light.setState( this.light.strongLightState ); // 切换状态到 strongLightState
};
// StrongLightState：
var StrongLightState = function( light ){
  this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function(){
  console.log( '关灯' ); // strongLightState 对应的行为
  this.light.setState( this.light.offLightState ); // 切换状态到 offLightState
}; 
var Light = function(){
  this.offLightState = new OffLightState( this );
  this.weakLightState = new WeakLightState( this );
  this.strongLightState = new StrongLightState( this );
  this.button = null;
}; 
Light.prototype.init = function(){
  var button = document.createElement( 'button' ),
      self = this; 
  this.button = document.body.appendChild( button );
  this.button.innerHTML = '开关';
  this.currState = this.offLightState; // 设置当前状态
  this.button.onclick = function(){
    self.currState.buttonWasPressed();
  }
}; 
Light.prototype.setState = function( newState ){
  this.currState = newState;
}; 
var light = new Light();
light.init(); 
