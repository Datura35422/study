"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var routers_1 = __importDefault(require("../routers"));
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
function controller(root) {
    // target 是构造函数类型
    return function (target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata('path', target.prototype, key); // 获取 path 元数据
            var method = Reflect.getMetadata('method', target.prototype, key);
            var handler = target.prototype[key];
            var middlewares = Reflect.getMetadata('middlewares', target.prototype, key) || [];
            var route = root === '/' ? path : "" + root + path;
            if (path && method && handler) {
                middlewares.length > 0 ? routers_1.default[method].apply(routers_1.default, __spreadArray(__spreadArray([route], middlewares), [handler])) : routers_1.default[method](route, handler);
            }
        }
    };
}
exports.controller = controller;
