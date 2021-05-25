import { RequestHandler } from 'express'

// 中间件 使用 工厂函数
export function use(middleware: RequestHandler) {
    return function(target: any, key: string) {
        // if (Reflect.hasMetadata('middleware', target, key)) {
        //     const lastMiddleware = Reflect.getMetadata('middleware', target, key)
        //     Reflect.defineMetadata('middleware', lastMiddleware.concat(middleware), target, key)
        //     return
        // }
        const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || []
        originMiddlewares.push(middleware)
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key)
    }
}