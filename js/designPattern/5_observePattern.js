// 发布-订阅模式(观察者模式): 定义对象间的一种一对多的依赖关系,当一个状态发生改变时,所有依赖于它的对象都将得到通知.
// 首先要指定好发布者
// 然后给发布者添加一个缓存列表, 用户存放回调函数以便通知订阅者
// 最后发布消息的时候,发布者遍历缓存列表,依次触发里面存放的订阅者回调函数

// 初始版本
var saleOffices = {} // 定义售楼处
saleOffices.clientList = {} // 缓存列表，存放订阅者的回调函数
saleOffices.listen = function(key, fn) {
    if (!this.clientList[key]) {
        // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
        this.clientList[key] = []
    }
    this.clientList[key].push(fn) // 订阅的消息添加进消息缓存列表
}
saleOffices.trigger = function() {
    var key = Array.prototype.shift.call(arguments)
    var fns = this.clientList[key]
    if (!fns || fns.length === 0) {
        return false
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
        fn.apply(this, arguments)
    }
}
saleOffices.listen('squareMeter88', function(price) {
    console.log('价格= ' + price)
})
saleOffices.listen('squareMeter110', function(price) {
    console.log('价格= ' + price)
})
saleOffices.trigger('squareMeter88', 2000000)
saleOffices.trigger('squareMeter110', 3000000)

// 发布-订阅模式的通用实现
var event = {
    clientList: [],
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn) // 订阅的消息添加进缓存列表
    },
    trigger: function() {
        var key = Array.prototype.shift.call(arguments)
        var fns = this.clientList[key]
        if (!fns || fns.length === 0) {
            // 如果没有绑定对应的消息
            return false
        }

        for (var i = 0, fn; (fn = fns[i++]); ) {
            fn.apply(this, arguments) // arguments是trigger时带上的参数
        }
    },
    // 取消订阅的事件
    remove: function(key, fn) {
        var fns = this.clientList[key]
        // 如果key对应的消息没有被人订阅，则直接返回
        if (!fns) {
            return false
        }
        // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
        if (!fn) {
            fns && (fns.length = 0)
        } else {
            // 反向遍历订阅的回调函数列表
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l]
                if (_fn === fn) {
                    fns.splice(l, 1) // 删除订阅者的回调函数
                }
            }
        }
    }
}
// 给所有的对象都动态安装发布-订阅功能
var installEvent = function(obj) {
    for (var i in event) {
        obj[i] = event[i]
    }
}

var saleOffices = {}
installEvent(saleOffices)
saleOffices.listen('squareMeter88', function(price) {
    console.log('1价格= ' + price)
})
saleOffices.listen(
    'squareMeter110',
    (fn1 = function(price) {
        console.log('1价格= ' + price)
    })
)
saleOffices.listen(
    'squareMeter110',
    (fn2 = function(price) {
        console.log('2价格= ' + price)
    })
)
saleOffices.trigger('squareMeter88', 2000000)
saleOffices.trigger('squareMeter110', 3000000)

saleOffices.remove('squareMeter110', fn1) // 删除fn1的订阅
saleOffices.trigger('squareMeter110', 3500000)

// 特殊情况下进行先发布后订阅的功能
// 创建一个存放离线事件的堆栈，当时间发布的时候，如果此时还没有订阅者来订阅这个事件，
// 暂时把发布事件的动作包裹在一个函数里，这些包装函数将被存入堆栈中，等到有对象来订阅此事件时，
// 将遍历堆栈并且依次执行这些包装函数，即重新发布里面的事件。注意离线事件的生命周期只有一次。

// 全局事件的命名冲突，创建命名空间避免命名冲突
var Event = (function() {
    var _default = 'default'

    var Event = (function() {
        var _listen,
            _trigger,
            _remove,
            _slice = Array.prototype.slice,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            namespaceCache = {},
            _create,
            find
        var each = function(ary, fn) {
            var ret
            for (var i = 0, l = ary.length; i < l; i++) {
                var n = ary[i]
                ret = fn.call(n, i, n)
            }
            return ret
        }
        _listen = function(key, fn, cache) {
            if (!cache[key]) {
                cache[key] = []
            }
            cache[key].push(fn)
        }
        _remove = function(key, cache, fn) {
            if (cache[key]) {
                if (fn) {
                    for (var i = cache[key].length; i >= 0; i--) {
                        if (cache[key][i] === fn) {
                            cache[key].splice(i, 1)
                        }
                    }
                } else {
                    cache[key] = []
                }
            }
        }
        _trigger = function() {
            var cache = _shift.call(arguments)
            var key = _shift.call(arguments)
            var args = arguments
            var _self = this
            var stack = cache[key]
            if (!stack || !stack.length) {
                return
            }
            return each(stack, function() {
                return this.apply(_self, args)
            })
        }
        _create = function(namespace) {
            var namespace = namespace || _default
            var cache = {}
            var offlineStack = [] // 离线事件
            var ret = {
                listen: function(key, fn, last) {
                    _listen(key, fn, cache)
                    if (offlineStack === null) {
                        return
                    }
                    if (last === 'last') {
                        offlineStack.length && offlineStack.pop()
                    } else {
                        each(offlineStack, function() {
                            this()
                        })
                    }
                    offlineStack = null
                },
                one: function(key, fn, last) {
                    _remove(key, cache)
                    this.listen(key, fn, last)
                },
                remove: function(key, fn) {
                    _remove(key, cache, fn)
                },
                trigger: function() {
                    var fn,
                        args,
                        _self = this
                    _unshift.call(arguments, cache)
                    args = arguments
                    fn = function() {
                        return _trigger.apply(_self, args)
                    }
                    if (offlineStack) {
                        return offlineStack.push(fn)
                    }
                    return fn()
                }
            }
            return namespace
                ? namespaceCache[namespace]
                    ? namespaceCache[namespace]
                    : (namespaceCache[namespace] = ret)
                : ret
        }

        return {
            create: _create,
            one: function(key, fn, last) {
                var event = this.create()
                event.one(key, fn, last)
            },
            remove: function(key, fn) {
                var event = this.create()
                event.remove(key, fn)
            },
            listen: function(key, fn, last) {
                var event = this.create()
                event.listen(key, fn, last)
            },
            trigger: function() {
                var event = this.create()
                event.trigger.apply(this, arguments)
            }
        }
    })()
    return Event
})()

// 发布-订阅模式的优点：1.时间上的解耦，2.对象之间的解耦
// 发布-订阅模式的缺点：创建订阅者本身要消耗一定的事件和内存，
// 而且当你订阅一个消息后，也许次消息最后都为发生，但这个订阅者会始终存在于内存中。
// 另外，发布-订阅模式虽然可以弱化对象之间的联系，但如果过度使用的话，对象和对象之间的必要联系也将被深埋在背后，会导致程序难以维护和理解。