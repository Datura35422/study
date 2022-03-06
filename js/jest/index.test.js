// 教程：https://zhuanlan.zhihu.com/p/282835230


// 分组测试
describe('test', () => {
    const sum = require('./index')

    // test('adds 1 + 2 to equal 3', () => {
    //     expect(sum(1, 2)).toBe(3);
    // });

    it('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
})


test('对象赋值', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
});