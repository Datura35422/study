import React from 'react'
// import connect from '../../utils/connect'
import connect2 from '../../utils/connect2'
import {
    decrementAction,
    subNumberAction
} from '../../store/actionCreators'

function About(props) {
    return (
        <div>
            <h4>About - 当前计数： {props.counter}</h4>
            <div>
                <button onClick={e => props.decrement()}>-1</button>
                <button onClick={e => props.subNumber(5)}>-5</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        counter: state.counterInfo.counter // reducer 进行了细分
    }
}

const mapDipatchToProps = dispatch => {
    return {
        decrement() {
            dispatch(decrementAction())
        },
        subNumber(num) {
            dispatch(subNumberAction(num))
        }
    }
}

// export default connect(mapStateToProps, mapDipatchToProps)(About)
export default connect2(mapStateToProps, mapDipatchToProps)(About)