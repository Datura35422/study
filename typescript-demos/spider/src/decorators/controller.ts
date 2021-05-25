import { RequestHandler } from 'express'
import router from '../routers'
import { Methods } from './request'

// export function controller(target: any) {
//     for (let key in target.prototype) {
//         const path: string = Reflect.getMetadata('path', target.prototype, key) // 获取 path 元数据
//         const method: Methods = Reflect.getMetadata('method', target.prototype, key)
//         const handler = target.prototype[key]
//         const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)
//         console.log(path, method)
//         if (path && method && handler) {
//             middleware ? router[method](path, middleware, handler) : router[method](path, handler)
//         }
//     }
// }

// 优化 设置root路径
export function controller(root: string) {
    // target 是构造函数类型
    return function(target: new ([...args]: any[]) => any) {
        for (let key in target.prototype) {
            const path: string = Reflect.getMetadata('path', target.prototype, key) // 获取 path 元数据
            const method: Methods = Reflect.getMetadata('method', target.prototype, key)
            const handler = target.prototype[key]
            const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key) || []
            const route = root === '/' ? path : `${root}${path}`
            if (path && method && handler) {
                middlewares.length > 0 ? router[method](route, ...middlewares, handler) : router[method](route, handler)
            }
        }
    }
}