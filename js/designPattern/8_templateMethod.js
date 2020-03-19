// 模板方式模式
// 基于继承的设计模式
// 模板方法模式是一种只需使用继承就可以实现的模式
// 有两部分结构组成，第一部分是抽象弗雷，第二部分是具体的实现子类。
// 通常在抽象父类中服装了子类的算法框架，包括实现一些公共方法以及封装子类中的中所有方法的执行顺序。
// 子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

// 抽象类：具体类可以被实例化，抽象类不能被实例化。模板方法模式是一种严重依赖抽象类的设计模式。
// 抽象类一般是用来被具体类继承的。

// JavaScript没有抽象类的缺点和解决方案
// 容易出现忘记重写父类中的抽象方法而导致出错
// 解决方案：
// 1.用鸭子来兴来模拟接口检查，以确保子类中确实重写了父类的方法，但是模拟接口检查会带来不必要的复杂性。
// 2.让父类抽象方法抛出异常，但是只有运行时才能知道异常情况。

// 钩子（hook）方法
// 放置钩子是隔离变化的一种常见手段。
// 钩子方法的返回结果决定了末班方法后面部分的执行步骤。
var Beverage = function(){};
Beverage.prototype.boilWater = function(){
 console.log( '把水煮沸' );
};
Beverage.prototype.brew = function(){
 throw new Error( '子类必须重写 brew 方法' );
};
Beverage.prototype.pourInCup = function(){
 throw new Error( '子类必须重写 pourInCup 方法' );
};
Beverage.prototype.addCondiments = function(){
 throw new Error( '子类必须重写 addCondiments 方法' );
};
Beverage.prototype.customerWantsCondiments = function(){
 return true; // 默认需要调料
};
Beverage.prototype.init = function(){
 this.boilWater();
 this.brew();
 this.pourInCup();
 if ( this.customerWantsCondiments() ){ // 如果挂钩返回 true，则需要调料
 this.addCondiments();
 }
};
var CoffeeWithHook = function(){};
CoffeeWithHook.prototype = new Beverage();
CoffeeWithHook.prototype.brew = function(){
 console.log( '用沸水冲泡咖啡' );
};
CoffeeWithHook.prototype.pourInCup = function(){
 console.log( '把咖啡倒进杯子' );
};
CoffeeWithHook.prototype.addCondiments = function(){
 console.log( '加糖和牛奶' );
};
CoffeeWithHook.prototype.customerWantsCondiments = function(){
 return window.confirm( '请问需要调料吗？' );
};
var coffeeWithHook = new CoffeeWithHook();
coffeeWithHook.init();