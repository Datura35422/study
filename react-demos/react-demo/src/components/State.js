import React, { Component } from 'react';

class State extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }
    
    render() {
        return (
            <div>
                <span>{ this.state.counter }</span>
                <button onClick={() => this.increment()}>+1</button>
            </div>
        )
    }

    increment() {
        // 1. setState 本身被合并
        // this.setState({
        //     counter: this.state.counter + 1
        // })
        // this.setState({
        //     counter: this.state.counter + 1
        // })
        // this.setState({
        //     counter: this.state.counter + 1
        // })
        // this.setState({
        //     counter: this.state.counter + 1
        // })
        // 2. setState 合并时进行累加
        this.setState((prevState, props) => {
            return {
                counter: prevState.counter + 1
            }
        })
        this.setState((prevState, props) => {
            return {
                counter: prevState.counter + 1
            }
        })
        this.setState((prevState, props) => {
            return {
                counter: prevState.counter + 1
            } 
        })
        this.setState((prevState, props) => {
            return {
                counter: prevState.counter + 1
            }
        })
        // 一次性就会加 4次
        const arr = [{a:1}, {a:2}]
        const arr2 = [...arr]
        arr2[0].a = 3
        console.log(arr, arr2)
    }
}

export default State;