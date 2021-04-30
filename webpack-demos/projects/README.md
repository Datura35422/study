## 如何实现多个项目共用 node_modules 和 package.json

差异性不大的多个项目是否可以共用一个 `node_modules` ，使用公共组件部分、公共插件。

### 方案

#### 方案一

每个项目中独立配置项目差异 `config` 文件，相同配置使用根目录的 `webpack.base.config.js`

实现：

- [./webpack.base.config.js](./webpack.base.config.js)、
- [projectA/webpack.config.js](./projectA/webpack.config.js)、
- [projectB/webpack.config.js](./projectB/webpack.config.js)
- 根目录下的 `package.json` 的 `scripts` 命令：`npx webpack --config ./projectA/webpack.config.js && npx webpack --config ./projectB/webpack.config.js`  


#### 方案二

使用根目录统一的 config 文件进行做差异化处理

实现：

- [./webpack.config.js](./webpack.config.js)
- 根目录下的 `package.json` 的 `scripts` 命令：`npx webpack --env PROJECT=projectA && npx webpack --env PROJECT=projectB`  



#### 注意点

两种方案都使用了 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并配置。

配置的主要问题是获取到具体项目的路径、以及定义配置的上下文环境 `context` 和 `node_modules` 路径解析 `resolve.modules`。