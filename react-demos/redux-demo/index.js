const redux = require('redux')

// 常量
// const actionTypes = {
//     INCREMENT: 'INCREMENT',
//     DECREMENT: 'DECREMENT',
//     ADD_NUMBER: 'ADD_NUMBER',
//     SUB_NUMBER: 'SUB_NUMBER'
// }
const actionTypes = {
    INCREMENT: Symbol('INCREMENT'),
    DECREMENT: Symbol('DECREMENT'),
    ADD_NUMBER: Symbol('ADD_NUMBER'),
    SUB_NUMBER: Symbol('SUB_NUMBER')
}

// 初始值
const initialState = {
    counter: 0
}

// reducer 
// 默认情况下 初始化state是没有值的，所以此时要赋值初始值
function reducer(state = initialState, action) {
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

// store （创建的时候需要传入 reducer）
const store = redux.createStore(reducer)

// 订阅 store 的修改 要在派发action之前做
store.subscribe(() => {
    console.log('state 发生了修改', store.getState().counter)
})

// actions 
const action1 = {type: actionTypes.INCREMENT}
const action2 = {type: actionTypes.DECREMENT}

const action3 = {type: actionTypes.ADD_NUMBER, num: 5}
const action4 = {type: actionTypes.SUB_NUMBER, num: 12}
// 函数方式动态设置传入参数
const action5 = num => {
    return {type: actionTypes.ADD_NUMBER, num}
}

// 派发 action 然后执行 reducer纯函数进行处理数据
store.dispatch(action1)
store.dispatch(action2)
store.dispatch(action3)
store.dispatch(action4)
store.dispatch(action5(90))