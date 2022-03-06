const { isEqual, isFunction, hasIn, isObject } = require('lodash');

function deepCompareObject(prevValue, nextValue) {
  if (isEqual(prevValue, nextValue)) {
    return true;
  }
  if (typeof prevValue !== typeof nextValue) {
    return false;
  }
  if (['string', 'number', 'boolean', 'undefined'].includes(typeof prevValue)) {
    return false;
  }
  if (prevValue === null || nextValue === null) {
    return false;
  }
  if (isFunction(prevValue)) {
    return prevValue.toString() === nextValue.toString();
  }
  // object & array
  if (isObject(prevValue) && isObject(nextValue)) {
    const prevValueKeys = Object.keys(prevValue);
    const nextValueKeys = Object.keys(nextValue);
    if (prevValueKeys.length !== nextValueKeys.length) {
      return false;
    }
    for (let i = 0; i < prevValueKeys.length; i++) {
      if (!hasIn(nextValue, prevValueKeys[i])) {
        return false;
      }
      const result = deepCompareObject(prevValue[prevValueKeys[i]], nextValue[prevValueKeys[i]]);
      if (!result) {
        return false;
      }
    }
    return true;
  }
  return false;
}

module.exports = deepCompareObject;

const a = {
  select: {
    reportId: 1,
    menu: [
      {
        a: 1,
        b: 2,
        c: (a, b) => a + b,
        d: [1, 2, 3],
      }
    ],
  }
}

const b = {
  select: {
    reportId: 1,
    menu: [
      {
        a: 1,
        b: 2,
        c: (a, b) => a + b,
        d: [1, 2, 3, 4],
      }
    ],
  }
};

const c = {
  select: {
    reportId: 1,
    menu: [
      {
        a: 1,
        b: 2,
        c: (a, b) => a + b,
        d: [1, 2, 3, 4],
      }
    ],
  }
}

const d = {
  select: {
    reportId: 2,
    menu: [
      {
        a: 1,
        b: 2,
        c: (a, b) => a + b,
        d: [1, 2, 3, 4],
      }
    ],
  }
};


// console.log('deepCompareObject: ', deepCompareObject(a, b))
// console.log('deepCompareObject: ', deepCompareObject(c, d))
// console.log('deepCompareObject: ', deepCompareObject(1, 1))
// console.log('deepCompareObject: ', isEqual(1, 2))
// console.log('deepCompareObject: ', deepCompareObject('a', 'b'))
