/**
 * Class Component 类组件
 */
import React, { Component } from 'react'

export default class ClassComponent extends Component {
    constructor() {
        super()
        this.state = {
            msg: 'Class Component'
        }
    }

    render() {
        return (
            <div>{ this.state.msg }</div>
        )
    }
}