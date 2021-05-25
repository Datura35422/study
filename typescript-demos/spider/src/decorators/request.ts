export enum Methods {
    get = 'get',
    post = 'post',
}

// 工厂函数优化
function getRequestDecorator(type: string) {
    return function(path: string) {
        return function(target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key)
            Reflect.defineMetadata('method', type, target, key)
        }
    }
}

export const get = getRequestDecorator(Methods.get)

export const post = getRequestDecorator(Methods.post)