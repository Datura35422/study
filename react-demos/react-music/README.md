# react-music

codewhy react课程 高仿网易云音乐 web 项目

项目命令行

```shell
  yarn start

  yarn test

  yarn build

  yarn eject
```

## 项目规范

- 文件夹、文件名称统一小写、多个单词以连接符（-）连接；
- JavaScript 变量名称采用小驼峰标识，常量全部使用大写字母，组件采用大驼峰；
- CSS 采用普通 CSS 和 styled-component 结合来编写（全局采用普通CSS、局部采用 styled-component）；
- 整个项目不在使用 class 组件，统一使用函数式组件和 Hooks；
- 所有的函数式组件，为了避免不必要的渲染，全部使用 memo 进行包裹；
- 组件名用项目组名的方式进行定义，加以区分；
- 组件内部的状态，使用useState、useReducer；业务数据全部放在 redux中管理；
- 函数组件内部基本按照如下顺序编写代码：
  - 组件内部 state 管理；
  - redux 的 hooks 代码；
  - 其他组件 hooks 代码；
  - 其他逻辑代码；
  - 返回 JSX 代码；
- redux 的代码规范如下：
  - 每个人模块有自己独立的 reducer，通过 combineReducer 进行合并；
  - 异步请求代码使用 redux-thunk，并且写在 actionCreators中；
  - redux 直接采用 redux hooks方式编写，不再使用 connect；
- 网络请求采用 axios ：
  - 对 axios 进行二次封装；
  - 所有的模块请求会放到一个请求文件中单独管理；
  - 所有请求数据使用 redux 进行管理；
- 项目使用部分 AntDesign 组件；

## 功能

### 已做

- [x] 歌曲播放
- [x] 添加歌曲
- [x] 上 / 下一首
- [x] 播放模式切换

### 待做

- [ ] 歌词解析

- [ ] 播放列表面板
