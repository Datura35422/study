// https://github.com/rbuckton/reflect-metadata
// 第二版
import { RequestHandler, Router } from 'express'

export const router = Router()

enum Method {
    get = 'get',
    post = 'post',
}

export function controller(target: any) {
    for (let key in target.prototype) {
        const path = Reflect.getMetadata('path', target.prototype, key) // 获取 path 元数据
        const method: Method = Reflect.getMetadata('method', target.prototype, key)
        const handler = target.prototype[key]
        const middleware = Reflect.getMetadata('middleware', target.prototype, key)
        console.log(path, method)
        if (path && method && handler) {
            middleware ? router[method](path, middleware, handler) : router[method](path, handler)
        }
    }
}

// export function get(path: string) {
//     return function(target: any, key: string) {
//         console.log(path, target, key)
//         // 定义 path 元数据
//         Reflect.defineMetadata('path', path, target, key)
//         Reflect.defineMetadata('method', 'get', target, key)
//     }
// }

// export function post(path: string) {
//     return function(target: any, key: string) {
//         console.log(path, target, key)
//         Reflect.defineMetadata('path', path, target, key)
//         Reflect.defineMetadata('method', 'post', target, key)
//     }
// }

// 工厂函数优化
function getRequestDecorator(type: string) {
    return function(path: string) {
        return function(target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key)
            Reflect.defineMetadata('method', type, target, key)
        }
    }
}

export const get = getRequestDecorator('get')

export const post = getRequestDecorator('post')


// 中间件 使用 工厂函数
export function use(middleware: RequestHandler) {
    return function(target: any, key: string) {
        Reflect.defineMetadata('middleware', middleware, target, key)
    }
}