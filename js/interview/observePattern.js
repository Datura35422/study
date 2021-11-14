var broastEvent = {
    // 消息监听队列
    clientList: {},
    // 订阅（监听）消息
    listen: function(observe, action) {
        const clientList = this.clientList
        if (clientList[observe]) { // 如果已经存在订阅消息了
            clientList[observe].push(action) // 新增监听
        } else {
            clientList[observe] = [].concat(action)
        }
    },
    // 发布（触发）消息
    trigger: function(observe, ...args) {
        const actionList = this.clientList[observe] || []
        if (actionList.length > 0) {
            actionList.forEach(fn => {
                fn(...args)
            })
        }
    },
    // 移除消息监听
    remove: function(observe) {
        this.clientList && delete this.clientList[observe]
    }
}


var broastEvent2 = {
    clientList: new Map(),
    _addListen: function(observe, actionObj, isUniq = false) {
        const clientList = this.clientList
        if (!isUniq && clientList.has(observe)) {
            clientList.get(observe).push(actionObj)
        } else {
            clientList.set(observe, [].concat(actionObj))
        }
    },
    listen: function(observe, action, isUniq = false) { // 默认不唯一
        this._addListen(observe, {action}, isUniq)
    },
    once: function(observe, action, isUniq = false) {
        this._addListen(observe, {
            action,
            once: true
        }, isUniq)
    },
    trigger: function(observe, ...args) {
        let actions = this.clientList.get(observe) || []
        if (actions.length > 0) {
            actions = actions.filter(item => {
                try {
                    item.action(...args)
                } catch(e) {
                    console.log(e)
                }
                // item.action(...args)
                return !item.once
            })
            actions.length === 0 ? this.remove(observe) : this.clientList.set(observe, actions)
        }
    },
    remove: function(observe, action) {
        if (this.clientList.has(observe) && action) {
            let actions = this.clientList.get(observe)
            const index = actions.findIndex(item => item.action === action)
            actions.splice(index, 1) // 可以使用filter改写
            actions.length === 0 && this.removeAll(observe)
        }
        if (!action) {
            this.removeAll(observe)
        }
    },
    removeAll: function(observe) {
        this.clientList.has(observe) && this.clientList.delete(observe)
    }
}

function test(...args) {
    console.log(...args)
}

broastEvent2.once('some', function (...args) {
    console.log('some: ', args)
}.bind(this))
try {
broastEvent2.listen('some2', test)
} catch(e) {
    console.log('err: ', e)
}
broastEvent2.listen('some3', (...args) => {
    console.log('some3: ', args)
})

broastEvent2.listen('some3', (...args) => {
    console.log('some3 isUniq: ', args)
}, true)
setTimeout(() => {
    broastEvent2.trigger('some', 123, 234)
    broastEvent2.trigger('some2', 123, 234)
    broastEvent2.remove('some2', test)
    broastEvent2.trigger('some3', 123, 234)
}, 2000)
setTimeout(() => {
    broastEvent2.trigger('some2', 123, 234)
    broastEvent2.trigger('some', 123, 234)
    broastEvent2.trigger('some3', 456)
}, 5000)