// 搭建server模拟webpack-dev-server功能 https://webpack.docschina.org/guides/development/#using-webpack-dev-middleware
// webpack使用参考链接 https://v4.webpack.js.org/api/node/ 
// 运行 node server.js
// 安装 express 和 webpack-dev-middleware -D 
// 搭建web服务器 监听文件变化后自动编译发布到服务器上
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const compiler = webpack(config) // webpack编译器

const app = express()
app.use(webpackDevMiddleware(compiler, {
  publickPath: config.output.publicPath
}))

app.listen(3000, () => {
  console.log('server start')
})