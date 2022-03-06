// 策略模式: 定义一系列的算法,把它们一个个封装起来,并且使它们可以相互替换.
// 一个基于策略模式的程序至少由两个部分组成.
// 第一个部分是一组策略类,策略类封装了具体的算法,并负责具体的计算过程.
// 第二个部分是环境类Context,Context接受客户的请求,随后吧请求委托给某一个策略类.
// Context中要维持对某个策略对象的引用.

// 使用策略模式计算奖金
// 绩效的计算规则策略类
var performanceS = function () {}
performanceS.prototype.calculate = function (salary) {
  return salary * 4
}

var performanceA = function () {}
performanceA.prototype.calculate = function (salary) {
  return salary * 3
}

var performanceB = function () {}
performanceB.prototype.calculate = function (salary) {
  return salary * 2
}

// 奖金类Bonus
var Bonus = function () {
  this.salary = null // 原始工资
  this.strategy = null // 绩效等级对应的策略对象
}

Bonus.prototype.setSalary = function (salary) {
  this.salary = salary // 设置员工的原始工资
}

Bonus.prototype.setSrategy = function (strategy) {
  this.strategy = strategy // 设置员工绩效等级对应的策略对象
}
// 取得奖金数额
Bonus.prototype.getBonus = function () {
  return this.strategy.calculate(this.salary) // 把计算奖金的操作委托给对应的策略对象
}
// 计算奖金
var bonus = new Bonus()
bonus.setSalary(10000)
bonus.setSrategy(new performanceS()) // 设置策略对象
console.log('performanceS', bonus.getBonus()) // 获取奖金
bonus.setSrategy(new performanceA()) // 替换策略对象
console.log('performanceA', bonus.getBonus())

// 对象改写
var strategies = {
  'S': function (salary) {
    return salary * 4
  },
  'A': function (salary) {
    return salary * 3
  },
  'B': function (salary) {
    return salary * 2
  }
}
var calculateBonus = function (level, salary) {
  return strategies[level](salary)
}
console.log('calculateBonus S', calculateBonus('S', 10000))
console.log('calculateBonus A', calculateBonus('A', 10000))

// 动画类
// 缓动动画
var tween = {
  linear: function (t, b, c, d) {
    return c * t / d + b
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b
  },
  strongEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b
  },
  strongEaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },
  sineaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t + b
  },
  sineaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  }
}
// Animate类
var Animate = function (dom) {
  this.dom = dom // 进行运动的dom节点
  this.startTime = 0 // 动画开始时间
  this.startPos = 0 // 动画开始时, dom节点的位置,即dom的初始位置
  this.endPos = 0 // 动画结束时,dom节点的位置,即dom的目标位置
  this.propertyName = null // dom节点需要被改变的css属性名
  this.easing = null // 缓动算法
  this.duration = null // 动画持续时间
}
// 动画启动,需要记录一些信息,供缓动算法在以后计算小球当前位置的时候使用
Animate.prototype.start = function (propertyName, endPos, duration, easing) {
  this.startTime = +new Date // 动画启动时间
  this.startPos = this.dom.getBoundingClientRect()[propertyName] // dom节点初始位置
  this.propertyName = propertyName // dom节点需要被改变的CSS属性名
  this.endPos = endPos // dom节点目标
  this.duration = duration // 动画持续时间
  this.easing = tween[easing] // 缓动算法

  var self = this
  // 启动定时器,开始执行动画
  var timeId = setInterval(function () {
    if (self.step() === false) { // 如果动画已结束,则清除定时器
      clearInterval(timeId)
    }
  }, 19)
}
// 设置动画每一帧需要做的事情
Animate.prototype.step = function () {
  var t = +new Date // 取得当前时间
  // 如果当前事件大于动画开始时间加上动画持续时间之和,说明动画已经结束,此时需要修正小球的位置
  if (t >= this.startTime + this.duration) {
    this.update(this.endPos) // 更新小球的CSS属性值
    return false // start函数清除定时器
  }
  var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration)
  // pos为小球当前位置
  this.update(pos) // 更新小球的CSS属性值
}
// 更新小球CSS属性值
Animate.prototype.update = function (pos) {
  this.dom.style[this.propertyName] = pos + 'px'
}

// 测试
// var div = document.getElementById('div')
// var animate = new Animate(div)
// animate.start('left', 500, 1000, 'strongEaseOut')

// 表单验证
// 校验逻辑封装为策略对象
var strategies = {
  // 不为空
  isNotEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  // 限制最小长度
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  // 校验手机号码格式
  isMobile: function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  }
}
// validator类作为context
var Validator = function () {
  this.cache = [] // 保存校验规则
}
// 仅验证一条规则
// Validator.prototype.add = function(dom, rule, errorMsg){
//   var ary = rule.split(':') // 把strategy和参数分开
//   this.cache.push(function(){ // 把校验的步骤用控函数包装起来,并且放入cache
//     var strategy = ary.shift() // 用户挑选的strategy
//     ary.unshift(dom.value) // 把input的value添加进参数列表
//     ary.push(errorMsg)
//     return strategies[strategy].apply(dom, ary)
//   })
// }
// 多条验证规则
Validator.prototype.add = function (dom, rules) {
  var self = this
  for (var i = 0, rule; rule = rules[i++];) {
    (function (rule) {
      var strategyAry = rule.strategy.split(':')
      var errorMsg = rule.errorMsg
      self.cache.push(function () {
        var strategy = strategyAry.shift()
        strategyAry.unshift(dom.value)
        strategyAry.push(errorMsg)
        return strategies[strategy].apply(dom, strategyAry)
      })
    })(rule)
  }
}
Validator.prototype.start = function () {
  for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    var msg = validatorFunc() // 开始校验,并取得校验后的返回信息
    if (msg) { // 如果有确切的返回值,说明校验没有通过
      return msg
    }
  }
}

// 使用
var validatorFunc = function () {
  var validator = new Validator() // 创建一个validator对象
  // 添加一些校验规则, 单条验证规则的使用
  // validator.add(registerForm.userName, 'isNotEmpty', '用户名不能为空')
  // validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位')
  // validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确')
  // 多条规则的验证
  validator.add(registerForm.userName, [{
    strategy: 'isNotEmpty',
    errorMsg: '用户名长度不能为空'
  }, {
    strategy: 'minLength:10',
    errorMsg: '用户名长度不能小于10位'
  }])
  var errorMsg = validator.start() // 获得校验结果
  return errorMsg // 返回校验结果
}

var registerForm = document.getElementById('registerForm')
registerForm.onsubmit = function () {
  var errorMsg = validatorFunc() // 如果errorMsg有确切发返回值,说明未通过校验
  if (errorMsg) {
    console.log(errorMsg)
    return false // 阻止表单提交
  }
}