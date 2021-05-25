"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
// 中间件 使用 工厂函数
function use(middleware) {
    return function (target, key) {
        // if (Reflect.hasMetadata('middleware', target, key)) {
        //     const lastMiddleware = Reflect.getMetadata('middleware', target, key)
        //     Reflect.defineMetadata('middleware', lastMiddleware.concat(middleware), target, key)
        //     return
        // }
        var originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlewares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    };
}
exports.use = use;
