// 命令模式：命令指的是一个执行某些特定事情的指令
// 命令模式常见的场景： 有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。
// 此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接受者能够消除彼此之间的耦合关系。

// 命令模式的由来，其实是回调函数的一个面向对象的替代品

// 宏命令： 是一组命令的集合，通过执行宏命令的方式，可以椅子执行一批命令。
// 子命令
var closeDoorCommand = {
  execute: function() {
    console.log('关门')
  }
}
var openPcCommand = {
  execute: function() {
    console.log('开电脑')
  }
}
var openQQComand = {
  execute: function() {
    console.log('登录 QQ')
  }
}
// 宏命令
var MacroCommand = function() {
  return {
    commandsList: [], 
    add: function(command) { // 把子命令添加进宏命令对象
      this.commandsList.push(command)
    },
    execute: function() { // 当调用宏命令对象的execute方法是，会迭代这一组子命令对象并以此执行它们的execute方法
      for(var i=0, command; command = this.commandsList[i++];){
        command.execute()
      }
    }
  }
}
var macroCommand = MacroCommand()
macroCommand.add(closeDoorCommand)
macroCommand.add(openPcCommand)
macroCommand.add(openQQComand)
macroCommand.execute()

// 智能命令与傻瓜命令
// 一般来说，命令模式都会在command对象中保存一个接收者来负责真正执行客户的请求，
// 这种情况下命令对象是“傻瓜式”的，它只负责吧客户的请求转交给接受者来执行，
// 这种模式的好处是请求发起者和请求接收者之间尽可能地得到了解耦。
// 智能命令对象可以直接实现请求，这样就不再需要接受者的存在。这样和策略模式相近。
// 与策略模式的区别：策略模式指向的问题域更小，所有策略对象的目标总是一致的，而智能命令模式指向的问题域更广，解决的目标根据发散性。