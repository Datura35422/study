import { combineReducers } from 'redux'
import * as actionTypes from './actionTypes'

// 初始值
// const initialState = {
//     counter: 0,
//     banners: [],
//     recommends: [],
// }

// function reducer(state = initialState, action) {
//     switch (action.type) {
//         case actionTypes.INCREMENT:
//             return {...state, counter: state.counter + 1}
//         case actionTypes.DECREMENT:
//             return {...state, counter: state.counter - 1}
//         case actionTypes.ADD_NUMBER:
//             return {...state, counter: state.counter + action.num}
//         case actionTypes.SUB_NUMBER:
//             return {...state, counter: state.counter - action.num}
//         case actionTypes.CHANGE_BANNERS:
//             return {...state, banners: action.banners}
//         case actionTypes.CHANGE_RECOMMENDS:
//             return {...state, recommends: action.recommends}
//         default:
//             return state
//     }
// }

// reducer 拆分 state 调用的地方需要一起修改
const defaultCounterState = {
    counter: 0
}

function counterReducer(state = defaultCounterState, action) {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return {...state, counter: state.counter + 1}
        case actionTypes.DECREMENT:
            return {...state, counter: state.counter - 1}
        case actionTypes.ADD_NUMBER:
            return {...state, counter: state.counter + action.num}
        case actionTypes.SUB_NUMBER:
            return {...state, counter: state.counter - action.num}
        default:
            return state
    }
}

const defaultHomeState = {
    banners: [],
    recommends: []
}
function homeReducer(state = defaultHomeState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_BANNERS:
            return {...state, banners: action.banners}
        case actionTypes.CHANGE_RECOMMENDS:
            return {...state, recommends: action.recommends}
        default:
            return state
    }
}

// function reducer(state = {}, action) {
//     return {
//         counterInfo: counterReducer(state.counterInfo, action),
//         homeInfo: homeReducer(state.homeInfo, action)
//     }
// }
// 最终的结果是 reducer 返回和 state = { counterInfo: {}, homeInfo: {} } 一样的对象格式

// 使用 redux combineReducers(reducers) api 进一步优化
const reducer = combineReducers({ 
    counterInfo: counterReducer, 
    homeInfo: homeReducer 
})


export default reducer