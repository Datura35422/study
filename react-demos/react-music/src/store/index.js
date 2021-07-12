import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'

// 导入 redux devtool 插件 https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

export default store