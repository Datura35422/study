import React, { Component } from 'react';

const { log } = console

class ComponentLifecycle extends Component {

    constructor() {
        super()
        log('执行组件的constructor')
        this.state = {
            count: 0,
            showDel: true,
        }
    }

    render() {
        log('执行组件的render')
        const { count, showDel } = this.state
        return (
            <div>
                组件的生命周期 
                <h2>count: { count }</h2>
                <button onClick={() => this.setState({ count: count + 1})}>update</button>
                <hr />
                <button onClick={() => this.setState({ showDel: !showDel})}>del</button>
                { showDel && <DelComponent></DelComponent> }
            </div>
        )
    }

    componentDidMount() {
        log('执行组件的componentDidMount')
    }

    componentDidUpdate() {
        log('执行组件的componentDidUpdate')
    }

    componentWillUnmount() {
        log('执行组件的componentWillUnmount')
    }
}

class DelComponent extends Component {
    render() {
        return (
            <div>
                del component
            </div>
        )
    }
    componentWillUnmount() {
        log('执行 DelComponent 组件的componentWillUnmount')
    }
}

export default ComponentLifecycle