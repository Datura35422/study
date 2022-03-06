const { isEqual, isObject, isArray } = require('lodash');

const formValue = {
  a: {b: 1, c: 2},
  b: [1,2,3],
  c: 3
}
const originalValue = {
  a: {b: 1, c: 2, d: {e: 5}},
  b: [1,2,3],
  c: 3,
  d: 4,
}

function isNotEqual(baseObj, otherObj) {
  return Object.keys(baseObj).some((key) => {
    if (baseObj[key] && otherObj[key] && !isEqual(baseObj[key], otherObj[key])) {
      if (typeof baseObj[key] !== typeof otherObj[key]) {
        return true
      }
      if (isObject(baseObj[key]) && baseObj[key].length === otherObj[key].length) {
        return isNotEqual(baseObj[key], otherObj[key])
      }
      return true;
    }
    return false;
  });
}

console.log('result: ', isNotEqual(formValue, originalValue));
