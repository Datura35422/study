慕课网 - React+TypeScript高仿AntDesign开发企业级UI组件库 课程学习

## 组织框架

## 样式结构

采用 sass 进行样式编写

安装 sass 样式预处理 参考链接：<https://create-react-app.dev/docs/adding-a-sass-stylesheet>

```shell
yarn add node-sass
```

组件库样式变量分类

- 基础色彩系统
- 字体系统
- 表单
- 按钮
- 边框和阴影
- 可配置开关

## 组件

### Button 组件

样式（颜色 / 大小）

disable 状态

事件

## 测试

### 相关链接

react test：<https://zh-hans.reactjs.org/docs/test-utils.html>

react-testing-library：<https://testing-library.com/docs/react-testing-library/intro/>

jest：<https://jestjs.io/zh-Hans/>

### 运行

创建 `*.test.tsx` 文件或 `test` 文件夹，运行命令行之后，代码会自动检测并运行测试文件

```shell
npm run test
```


### 课程中有些 👎 的地方

#### 关于 displayName 的使用

displayName 不是必须手动定义的，可以利用自动推断进行设置，一般使用的情况在于高阶组件中使用

相关链接：https://zh-hans.reactjs.org/docs/react-component.html#displayname

#### 关于 defaultProps 的使用

有 ts 进行声明 props 传入类型了，就可以省略这一步了，或者使用 ES6 方法中的解构预设值，可以避免去再维护 defaultProps 对象。

#### 关于变量命名问题

相关参考来自于《代码简洁之道》，使用一个错误的英文拼写是非常糟糕的一件事，代码命名尽量清晰并准确。

避免 follow 一些不好的命名方式。

#### 关于魔术字符串

有些地方需要消灭魔术字符串，使用 ts 的枚举值进行优化

#### 关于使用断言

应该谨慎使用断言，在处理 undefined 的时候应该使用 || 进行默认值处理。

除非是 ts 无法进行推断得出类型的时候可以进行使用。
