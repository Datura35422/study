function isShallowEqual(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !Object.is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }
  return true;
}

function deepCompareObject(prevValue, nextValue) {
  if (Object.is(prevValue, nextValue)) {
    return true;
  }
  if (typeof prevValue !== typeof nextValue) {
    return false;
  }
  if (typeof prevValue === 'function' && typeof nextValue === 'function') {
    return prevValue.toString() === nextValue.toString();
  }
  // object & array
  const keysA = Object.keys(prevValue);
  const keysB = Object.keys(nextValue);
  if (keysA.length !== keysB.length) {
    return false;
  }
  let result = [];
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(nextValue, keysA[i])) {
      return false;
    }
    result.push(deepCompareObject(prevValue[keysA[i]], nextValue[keysA[i]]));
  }
  return result.every(item => item);
}

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
        // c: (a, b) => a + b,
        d: [1, 2, 3, 4],
      }
    ],
  }
}

const d = {
  select: {
    reportId: 1,
    menu: [
      {
        a: 1,
        b: 2,
        // c: (a, b) => a + b,
        d: [1, 2, 3, 4],
      }
    ],
  }
};

// console.log(isShallowEqual(Symbol(), Symbol()));
// console.log(a.select.menu[0].c.toString(), a.select.menu[0].c.toString() === b.select.menu[0].c.toString());
// console.log(isShallowEqual(a.select.menu[0].d, b.select.menu[0].d))
// console.log(Object.is(a.select.menu[0].d, b.select.menu[0].d))
// console.log(Object.is([1, 2], [1, 2]))
// console.log('deepCompareObject: ', deepCompareObject(a, b))
// console.log('deepCompareObject: ', deepCompareObject(c, d))
