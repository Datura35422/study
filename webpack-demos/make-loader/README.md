## 编写一个简单的Loader

### 参考文档

loader api: https://webpack.docschina.org/api/loaders/

resolveLoader: https://webpack.docschina.org/configuration/resolve/#resolveloader

### 初始化简单的项目

```shell
npm init -y

npm install --save-dev webpack webpack-cli

```

### 创建loader

loader本质就是函数

创建完成本地的loader之后，在本地项目中使用`webpack.config.js`：

```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          // 使用本地loader
          path.resolve(__dirname, './loaders/replaceLoader.js')
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}

```

使用更多的配置项，让loader中可以获取到配置项内容：
```javascript
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          // 使用本地loader
          {
            loader: path.resolve(__dirname, './loaders/replaceLoader.js')
            options: { // loader中可以通过this.query获取配置内容
              name: 'dellLee'
            }
          }
        ]
      }
    ]
  }
  ...
}

// loader.js
module.exports = function(source) {
  console.log(this.query) // { name: 'dellLee }
  return source.replace('dell', this.query.name)
}
```

> 需要返回多余的信息使用this.callback，使用this.async进行异步操作

```javascript
// loader中使用this.async进行处理
module.exports = function(source) {
    const options = this.getOptions()
    const callback = this.async() // this.async返回一个this.callback
    
    setTimeout(() => {
        const result = source.replace('dell', opthions.name)
        callback(null, result)
    }, 1000)
}
```

使用`resolveLoader`用于解析本地的`webpack` `loader`包

```javascript
module.exports = {
    resolveLoader: {
        modules: ['node_modules', './loaders'], // 会先在node_modules查找loader，如果查找不到则会到第二个配置查找
       extensions: ['.js', '.json'],  
    },
    module: {
        use: [
            // 配合resolveLoader本地loader使用
            {
                loader: 'replaceLoader',
                options: { // loader中可以通过this.query获取配置内容
                  name: 'dellLee'
                }
            }
        ]
    }
}
```

可以使用loader做全局处理，如国际化、错误报警等。