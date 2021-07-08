import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import mySaga from './saga'

// 创建 saga 中间件
const sagaMiddleware = createSagaMiddleware()

// 应用一些中间件
const storeEnhancer = applyMiddleware(thunkMiddleware, sagaMiddleware)

// const store = createStore(reducer, storeEnhancer)

// 使用 redux devtool chrome插件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    storeEnhancer
))

// 运行 sagaMiddleware
sagaMiddleware.run(mySaga)

// store.subscribe(() => {
//     console.log('数据更新：', store.getState())
// })

export default store