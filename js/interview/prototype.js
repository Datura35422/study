// const obj = {}
// console.log(obj.prototype) // undefined

// const Fun = function() {}
// const fun = new Fun()
// console.log(Fun.prototype, Fun.prototype instanceof Fun, Fun.prototype instanceof Object) // {} false true
// console.log(Fun.constructor, Fun.prototype.constructor, Fun.prototype.constructor === Fun) // [Function: Function] [Function: Fun] true
// console.log(fun.prototype, fun.constructor, fun instanceof Fun) // undefined [Function: Fun] true
// console.log(Fun.prototype.constructor === fun.constructor) // true
// console.log(Fun.prototype.__proto__) // [Object: null prototype] {}

// console.log(fun.__proto__ === Fun.prototype) // true
// console.log(Fun.prototype.constructor === Fun) // true
// console.log(fun.__proto__.constructor === Fun) // true
// console.log(fun.constructor === Fun) // true
// console.log(fun.__proto__.constructor === Fun.prototype.constructor) // true

// function Foo() {}
// Foo.prototype.sayHello = function() {
//   console.log('hello')
// }
// const foo = new Foo()
// foo.sayHello()

// =========================原型链 ==============================
function SuperType(name) {
  this.name = name || '';
  this.sayHello = function() {
    console.log('Hello');
  }
}
SuperType.prototype.sayBye = function() {
  console.log('Bye')
}
function SubType() {}
SubType.prototype = new SuperType()
SubType.prototype.name = 'instance1'
let instance1 = new SubType();
console.log(instance1.name); // instance1
instance1.sayHello(); // Hello
instance1.sayBye(); // Bey

// =========================盗用构造继承==============================
// function SuperType(name) {
//   this.name = name || '';
//   this.sayHello = function() {
//     console.log('Hello');
//   }
// }
// SuperType.prototype.sayBye = function() {
//   console.log('Bye')
// }
// function SubType(name) {
// 	SuperType.call(this, name);
// }
// SubType.prototype = new SuperType('hello')
// let instance1 = new SubType('instance1');
// console.log(instance1.name); // instance1
// instance1.sayHello(); // Hello
// instance1.sayBye(); // Bey

// let instance2 = new SubType('instance2');
// console.log(instance2.colors); // "red,blue,green"
// console.log(instance2.name);


// ========================== 组合继承 ======================
// function SuperType(name){
//   this.name = name;
//   this.colors = ["red", "blue", "green"];
//   // this.sayHello = function() {
//   //   console.log('instance Hello');
//   // }
// }
// SuperType.prototype.sayHello = function() {
//   console.log('prototype Hello')
// }
// SuperType.prototype.sayName = function() {
//   console.log(this.name);
// };
// function SubType(name, age){
//   // 继承属性 盗用构造函数 继承实例上的属性
//   SuperType.call(this, name);
//   this.age = age;
// }
// // 继承方法 原型链方式 继承原型上的方法和属性
// SubType.prototype = new SuperType();
// SubType.prototype.sayAge = function() {
//   console.log(this.age);
// };
// let instance1 = new SubType("Nicholas", 29);
// instance1.colors.push("black");
// console.log(instance1.colors); // "red,blue,green,black"
// instance1.sayName(); // "Nicholas";
// instance1.sayAge(); // 29
// instance1.sayHello(); // instance Hello
// instance1.__proto__.sayHello() // instance Hello
// SubType.prototype.sayHello() // instance Hello
// let instance2 = new SubType("Greg", 27);
// console.log(instance2.colors); // "red,blue,green"
// instance2.sayName(); // "Greg";
// instance2.sayAge(); // 27

// function Person() {}
// const p1 = new Person()
// console.log(p1 instanceof Person) // true
// console.log(p1.__proto__ === Person.prototype) // true

// ============================================
// function Person() {
//   this.name = 'person'
// }
// function Func() {
//   this.name = 'func'
//   this.firstName = 'firstName'
// }

// const p1 = new Person()
// Person.prototype = new Func() // 继承
// const p2 = new Person()

// console.log(p1 instanceof Person, p1 instanceof Func) // false false
// console.log(p2 instanceof Person, p2 instanceof Func) // true true
// p1.__proto__.__proto__ = Person.prototype // 修改原型链
// console.log(p1 instanceof Person, p1 instanceof Func) // true true
 
// ===========================================================
// var speak = function(language) {
//   console.log(language, language.show, typeof language.show)
//   console.log(language.show instanceof Function)
// }
// var chinese = {
//   show() {
//     console.log('你好')
//   }
// }
// speak('chinese')
// console.log('------------------------')
// speak(chinese) // 改


