# webpack-demos
webpack demos
慕课网 webpack4 课程
## 库打包教程

[基础教程](./library/README.md)

## PWA(Progressive Web Application)打包教程

安装 `npm install workbox-webpack-plugin --save-dev`

在production的模式下，进行配置webpack.config.js

```javascript
const WorkBoxPlugin = require('workbox-webpack-plugin')

module.exports = {
  ...
  plugins: [
    new WorkboxPlugin.GennerateSw({ // serviceWorker
      clientsClaim: true,
      skipWaiting: true
    }) 
  ]
  ...
}
```
入口文件index.js，判断浏览器是否支持`service-worker`
```javascript
if ('serviceWorker' in navigator)  {
  window.addEventListener('load' , () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('service-worker registed')
      }).catch(error => {
        console.log('service-worker register error')
      })
  })
}
```

## TypeScript打包教程

[简单示例](./type-script/README.md)
 
## 编写Loader教程

[简单示例](./make-loader/README.md)

## 编写一个简易的bundler

[简单示例](./bundler/bundler.js)