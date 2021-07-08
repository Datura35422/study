import React, { useReducer } from 'react'

const actionTypes = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement'
}

function reducer(state, action) {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return {...state, counter: state.counter + 1}
        case actionTypes.DECREMENT:
            return {...state, counter: state.counter - 1}
        default:
            return state
    }
}

export default function UseReducer() {
    const [state, dispatch] = useReducer(reducer, { counter: 0 })

    return (
        <div>
            <hr />
            <h4>UseReducer 当前计数：{ state.counter }</h4>
            <button onClick={() => dispatch({ type: actionTypes.INCREMENT })} > +1 </button>
            <button onClick={() => dispatch({ type: actionTypes.DECREMENT })} > -1 </button>
        </div>
    )
}
