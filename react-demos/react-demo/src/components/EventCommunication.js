// 事件通信
import React, { Component } from 'react'

class EventCommunication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }
    
    render() {
        return (
            <div>
                <h3>{ this.state.counter }</h3>
                <Button increment={() => this.increment()} />
            </div>
        )
    }

    increment() {
        this.setState({
            counter: this.state.counter + 1
        })
    }
}

class Button extends Component {
    render() {
        const { increment } = this.props
        return (
            <button onClick={increment}>+1</button>
        )
    }
}

export default EventCommunication