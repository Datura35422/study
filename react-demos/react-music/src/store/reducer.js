import { combineReducers } from 'redux-immutable'

import { reducer as recommendReducer } from '@/pages/discover/children/recommend/store'
import { reducer as playerReducer } from '@/pages/player/store'

// 使用 redux-immutable 将对象自动转为 immutable 类型
export default combineReducers({
  recommend: recommendReducer,
  player: playerReducer,
})