function isCyclic (obj) {
  var seenObjects = [];
  
  function detect (obj) {
    if (typeof obj === 'object') {
      if (seenObjects.indexOf(obj) !== -1) {
        return true;
      }
      seenObjects.push(obj);
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          return true;
        }
      }
    }
    return false;
  }
  
  return detect(obj);
}

var a = {
    b: 1,
    c: 2
}
a.d = a
// console.log(a)
// checkObjCircularReference(a)
// console.log(isCyclic(a))
console.log(checkObj(a))
console.log(JSON.stringify(a))

function checkObj(obj) {
  let objKeySet = new WeakSet()
  function circle(obj) {
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      // 判断数组中是否已有 对象比较是指针比较
      if (objKeySet.has(obj)) {
        return true
      }
      objKeySet.add(obj)
      for (let key in obj) {
        if (typeof obj[key] === 'object' && circle(obj[key])) {
          return true
        }
      }
    }
    return false
  }
  return circle(obj)
}