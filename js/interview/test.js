// extends

// function Parent() {
//     this.a = 1;
//     this.b = [1, 2, this.a];
//     this.c = { demo: 5 };
//     this.d = 9
//     this.show = function () {
//       console.log(this.a , this.b , this.c.demo, this.d, this);
//     }
//   }
//   function Child() {
//     this.a = 2;
//     this.change = function () {
//       this.b.push(this.a);
//       this.a = this.b.length;
//       console.log(this, this.c.demo, this.a)
//       this.c.demo = this.a++;
//       this.d = Math.random()
//       console.log(this.c.demo)
//     }
//   }
//   Child.prototype = new Parent();
//   var parent = new Parent();
//   var child1 = new Child();
//   var child2 = new Child();
//   child1.a = 11;
//   child2.a = 12;
//   parent.show();
//   child1.show();
//   child2.show();
//   child1.change();
//   child2.change();
//   parent.show();
//   child1.show();
//   child2.show();


