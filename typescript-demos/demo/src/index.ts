// // 类的装饰器
// // 装饰器本身是一个函数 https://www.tslang.cn/docs/handbook/decorators.html

// // 装饰器模式
// function testDecorator() {
//     // 扩展构造函数
//     // 写法一：<T extends { new (...args: any[]): {} }> 
//     // 写法二：<T extends new (...args: any[]) => any>
//     return function<T extends new (...args: any[]) => any>(constructor: T) {
//         return class extends constructor {
//             name = 'xxxx'
//             getName() {
//                 return this.name
//             }
//         }
//     }
// }

// const Test = testDecorator()(
//     class {
//         name: string
//         constructor(name: string) {
//             this.name = name
//         }
//     }
// )

// // 使用
// const test = new Test('xx')
// console.log(test.getName())


// 装饰器实例使用 - 代码复用 包装函数
const userInfo: any = undefined

// function catchError(target: any, key: string, descriptor: PropertyDescriptor) {
//     const fn = descriptor.value
//     descriptor.value = function() {
//         try {
//             fn()
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }

// class Test {
//     @catchError
//     getName() {
//         return userInfo.name
//     }

//     @catchError
//     getAge() {
//         return userInfo.age
//     }
// }

// const test = new Test()
// test.getName()


// 优化 自定义参数错误提示 catchError改写
function catchError(errMsg: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const fn = descriptor.value
        descriptor.value = function() {
            try {
                fn()
            } catch (e) {
                console.log(errMsg)
            }
        }
    }
}


class Test {
    @catchError('userInfo.name 出错')
    getName() {
        return userInfo.name
    }

    @catchError('userInfo.age 出错')
    getAge() {
        return userInfo.age
    }
}

const test = new Test()
test.getName()