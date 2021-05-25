/**
 * 路由文件
 */

import { Router, Request, Response } from 'express'
import Crowller from './spider'
import fs from 'fs'
import path from 'path'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

router.get('/setData', (req: Request, res: Response) => {
    new Crowller()
    res.send('setData')
})

router.get('/getData', (req: Request, res: Response) => {
    try {
        const filePath = path.resolve(__dirname, '../data/content.json')
        const result = fs.readFileSync(filePath, 'utf8')
        res.json(JSON.parse(result))
    } catch(e) {
        res.send('暂无数据')
    }
})

export default router