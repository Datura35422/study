const redux = require('redux')

const actionTypes = {
    ADD_NUMBER: 'ADD_NUMBER',
    SUB_NUMBER: 'SUB_NUMBER'
}

const actionCreators = {
    addAction(num) {
        return {
            type: actionTypes.ADD_NUMBER,
            num
        }
    },
    subAction(num) {
        return {
            type: actionTypes.SUB_NUMBER,
            num
        }
    },
    thunkAction(dispatch, getState) {
        dispatch(actionCreators.subAction(1))
        console.log('state: ', getState())
    }
}

const initialState = {
    counter: 0
}

// reducer 
// 默认情况下 初始化state是没有值的，所以此时要赋值初始值
function reducer(state = initialState, action) {
    switch (action.type) {
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

// 调用 ====================================================
// store.dispatch(actionCreators.addAction(10))
// console.log(store.getState())


// 根据需求封装中间件
// 需求：在 dispatch 之前打印一下数据，在 dispatch 之后打印一下数据

// 方式一 创建一个函数进行包裹
// function dispatchAndLogging(action) {
//     console.log('dispatch before--dispatching action: ', action)
//     store.dispatch(action)
//     console.log('dispatch after--new state: ', store.getState())
// }

// dispatchAndLogging(actionCreators.addAction(10))

// 方式二 hack技巧  monkeyingpatch 将原有的api重新进行定义 使用时依旧按照原来的使用方式进行
function patchLogging(store) {
    const next = store.dispatch 
    function dispatchAndLogging(action) {
        console.log('dispatch before--dispatching action: ', action)
        next(action)
        console.log('dispatch after--new state: ', store.getState())
    }
    store.dispatch = dispatchAndLogging
    // return dispatchAndLogging // 使用 applyMiddlewares
}

// 同理 封装 thunk 方法 处理 actionCreator是函数的情况
function patchThunk(store) {
    const next = store.dispatch
    function dispatchAndThunk(action) {
        if (typeof action === 'function') {
            action(next, store.getState)
        } else {
            next(action)
        }
    }
    store.dispatch = dispatchAndThunk
    // return dispatchAndThunk // 使用 applyMiddlewares
}

// 封装 applyMiddlewares 需要中间件函数返回纯函数的方式进行
// function applyMiddlewares(...middlewares) {
//     middlewares.forEach(middleware => {
//         store.dispatch = middleware(store)
//     })
// }
// applyMiddlewares(patchLogging, patchThunk)

patchLogging(store) // 装载 store.dispatch 
patchThunk(store)
store.dispatch(actionCreators.addAction(10)) // 依旧按照原来的方式进行调用
store.dispatch(actionCreators.thunkAction)