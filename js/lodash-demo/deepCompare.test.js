const { noop } = require('lodash');
const deepCompareObject = require('./deepCompare');

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
// console.log('deepCompareObject: ', deepCompareObject(1, 2))
// console.log('deepCompareObject: ', deepCompareObject('a', 'b'))

describe('test base data structure', () => {
  it('compare string data', () => {
    expect(deepCompareObject('a', 'a')).toBe(true);
    expect(deepCompareObject('a', 'b')).toBe(false);
    expect(deepCompareObject('a', 1)).toBe(false);
  });
  it('compare number data', () => {
    expect(deepCompareObject(1, 1)).toBe(true);
    expect(deepCompareObject(NaN, NaN)).toBe(true);
    expect(deepCompareObject(1, 2)).toBe(false);
    expect(deepCompareObject(1, NaN)).toBe(false);
    expect(deepCompareObject(1, '1')).toBe(false);
  });
  it('compare boolean data', () => {
    expect(deepCompareObject(true, true)).toBe(true);
    expect(deepCompareObject(true, false)).toBe(false);
    expect(deepCompareObject(true, null)).toBe(false);
    expect(deepCompareObject(true, undefined)).toBe(false);
    expect(deepCompareObject(true, '')).toBe(false);
    expect(deepCompareObject(true, 0)).toBe(false);
  });
  it('compare null/undefined data', () => {
    expect(deepCompareObject(null, null)).toBe(true);
    expect(deepCompareObject(undefined, undefined)).toBe(true);
    expect(deepCompareObject(null, undefined)).toBe(false);
    expect(deepCompareObject(null, '')).toBe(false);
    expect(deepCompareObject(undefined, '')).toBe(false);
    expect(deepCompareObject(null, 0)).toBe(false);
    expect(deepCompareObject(null, NaN)).toBe(false);
    expect(deepCompareObject(null, NaN)).toBe(false);
  });
})
