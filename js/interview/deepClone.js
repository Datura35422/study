function deepClone(obj) {
    if (obj === null || obj === undefined) {
        return obj
    }
    if (obj instanceof Date) {
        return new Date(obj)
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }
    if (obj instanceof Function) {
        return obj
    }
    if (obj instanceof Array) {
        let newArr = [...obj] // 基础类型数据先进行拷贝
        newArr = newArr.map(item => deepClone(item)) // 拷贝引用类型
        return newArr
    }
    if (obj instanceof Object) {
        let newObj = {}
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) { // 排除原型链上的属性，仅循环当前对象上的属性
                newObj[key] = deepClone(obj[key])
            }
        }
        let symbols = Object.getOwnPropertySymbols(obj) // 获取Symbol属性的值
        symbols.forEach(key => {
            newObj[key] = obj[key]
        })
        return newObj
    }
    return obj // 基础类型直接返回 String, Number, Boolean, Symbol
}

var x = {
    a: 1,
    b: 'str',
    c: true,
    d: Symbol('x'),
    e: null,
    f: undefined,
    g: function() { return 'g' },
    h: {
        m: 1,
        n() {
            return 'n'
        }
    },
    j: [1, 2, 3, Symbol()],
    k: [[4, 5], [6, 7]],
    l: [{
        m: 1,
        n: 2
    }, {
        m: 3,
        n: 4
    }]
}
var s = Symbol()
x[s] = 'symbol'
var y = deepClone(x)
x.a = 2
x.d = Symbol('x2')
x.g = function() { return 'g2' }
x.h.m = 2
x.h.n = function() { return 'n2' }
x.k[0] = [0, 1]
x.k[1][0] = 8
x.l[0].m = 11
x[s] = 'symbol2'

var log = console.log
log(y)
log(y.g())
log(y.h.n())

// {
//     a: 1,
//     b: 'str',
//     c: true,
//     d: Symbol(x),
//     e: null,
//     f: undefined,
//     g: [Function: g],
//     h: { m: 1, n: [Function: n] },
//     j: [ 1, 2, 3 ],
//     k: [ [ 4, 5 ], [ 6, 7 ] ],
//     l: [ { m: 1, n: 2 }, { m: 3, n: 4 } ]
//   }
//   g
//   n
