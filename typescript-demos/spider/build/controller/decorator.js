"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.post = exports.get = exports.controller = exports.router = void 0;
// https://github.com/rbuckton/reflect-metadata
// 第二版
var express_1 = require("express");
exports.router = express_1.Router();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key); // 获取 path 元数据
        var method = Reflect.getMetadata('method', target.prototype, key);
        var handler = target.prototype[key];
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        console.log(path, method);
        if (path && method && handler) {
            middleware ? exports.router[method](path, middleware, handler) : exports.router[method](path, handler);
        }
    }
}
exports.controller = controller;
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
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');
// 中间件 使用 工厂函数
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}
exports.use = use;
