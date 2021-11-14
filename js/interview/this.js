
class Test {
    getResult() {
        let { getThis } = this
        getThis() // this: undefined
        // 强制绑定this
        getThis = getThis.bind(this)
        getThis() // this: Test
        // 直接调用对象上的函数
        this.getThis() // this: Test
        // 调用的发起者会进行隐式绑定，如果将函数赋值到变量上，this就会隐式绑定到当前的调用环境上，而造成this丢失
        // 验证
        const test2 = new Test2()
        test2.getThis = this.getThis
        test2.getThis() // this: Test2
    }

    getThis() {
        console.log('this: ', this)
    }
}

class Test2 {}

const test = new Test()
test.getResult()