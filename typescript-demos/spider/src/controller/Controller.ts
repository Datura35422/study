import 'reflect-metadata'
import { NextFunction, Request, RequestHandler, Response } from 'express'
// 第二版
// import { controller, get } from './decorator'
// 第三版优化版本
import { controller, get, use } from '../decorators'
import { getResponseData } from '../utils/util'

const testMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    console.log('testMiddleware')
    next()
}
const testMiddleware2: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    console.log('testMiddleware2')
    next()
}

@controller('/')
class HomeController {
    @get('/')
    home(req: Request, res: Response) {
        res.send('hello world')
    }

    @get('/getData')
    @use(testMiddleware)
    @use(testMiddleware2)
    getData(req: Request, res: Response) {
        res.json(getResponseData('hello world getData'))
    }
}