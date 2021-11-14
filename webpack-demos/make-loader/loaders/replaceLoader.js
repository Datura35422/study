// 要使用this指向 不要使用箭头函数声明
module.exports = function(source) {
  debugger
  console.log(source)
  return source.replace('dell', 'dellLee');
}