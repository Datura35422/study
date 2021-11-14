function Foo() {
    console.log(this instanceof Foo, this)
}
// new Foo()
Foo.prototype.extends = function() {
    console.log('prototype', this, this instanceof Foo)
}

Foo.extends = function() { // 原型链继承方式无法进行继承
    console.log('static', this, this instanceof Foo)
}
Foo.extends() // 运行的是Foo.extends this指向function Foo
Foo() // this指向global
var foo = new Foo() // this指向Foo {}
foo.extends() // 运行的是Foo.prototype.extends

console.log(Object.create(Foo)) // Function {}
console.log(Object.create(Foo.prototype)) // Foo {}
var bar = Object.create(Foo.prototype)
bar.extends() // prototype Foo {} true


function Baz() {}
Baz.prototype = Object.create(Foo.prototype)
// Baz.prototype.constructor = Baz
console.log(Baz)
Baz.prototype.extends() // prototype Foo {} true
var baz = new Baz()
console.log(baz.extends === Baz.prototype.extends) // true
// Baz.extends() // error
console.log(Baz.prototype.constructor === Foo.prototype.constructor, baz.constructor === Foo) // true true Baz继承于Foo 则构造器指向也会改变

Baz.prototype.constructor = Baz // 修改构造器方法指向
console.log(Baz.prototype.constructor === Foo.prototype.constructor, baz.constructor === Baz) // false true