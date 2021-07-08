import React, { PureComponent } from 'react'
import store from '../../store'
import {
    decrementAction,
    subNumberAction
} from '../../store/actionCreators'

export default class About extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            counter: store.getState().counter
        }
    }

    componentDidMount() {
        // 订阅
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                counter: store.getState().counter
            })
        })
    }

    componentWillUnmount() {
        // 取消订阅
        this.unsubscribe()
    }

    render() {
        return (
            <div>
                <h4>About - 当前计数： {this.state.counter}</h4>
                <div>
                    <button onClick={e => this.decrement()}>-1</button>
                    <button onClick={e => this.subNumber(5)}>-5</button>
                </div>
            </div>
        )
    }

    decrement() {
        store.dispatch(decrementAction())
    }

    subNumber(num) {
        store.dispatch(subNumberAction(num))
    }
}
