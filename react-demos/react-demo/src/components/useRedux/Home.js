import React, { PureComponent } from 'react'
import store from '../../store'
import {
    incrementAction,
    addNumberAction
} from '../../store/actionCreators'

export default class Home extends PureComponent {

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
                <h4>Home - 当前计数： {this.state.counter}</h4>
                <div>
                    <button onClick={e => this.increment()}>+1</button>
                    <button onClick={e => this.addNumber(5)}>+5</button>
                </div>
            </div>
        )
    }

    increment() {
        store.dispatch(incrementAction())
    }

    addNumber(num) {
        store.dispatch(addNumberAction(num))
    }
}
