const isEqual = require('./isEqual');

describe('test base data structure', () => {
  it('compare string data', () => {
    expect(isEqual('a', 'a')).toBe(true);
    expect(isEqual('', undefined)).toBe(true);
  })
})