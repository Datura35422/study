import express from 'express'
// 第一版
// import router from './router'
// 第二版
// import './controller/Controller'
// import { router } from './controller/decorator'
// 优化第三版
import './controller'
import router from './routers'

const app = express()
app.use(router)

app.listen(3000, () => {
    console.log('server is running')
})