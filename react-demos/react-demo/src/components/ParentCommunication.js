import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Parent extends Component {
    render() {
        return (
            <div>
                <SonClass name="xxx" age="18"></SonClass>
                <SonClassNoCon name="xxx" age={18} ></SonClassNoCon>
                <SonFun name="yyy" age="18"></SonFun>
            </div>
        )
    }
}

class SonClass extends Component {
    constructor(props) {
        super()
        this.props = props
    }

    render() {
        const { name, age } = this.props
        return (
            <div>
                类子组件：{ name + ' ' + age }
            </div>
        )
    }
}

// 属性类型验证
SonClass.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number.isRequired, // 必传参数
}

// 属性默认值
SonClass.defaultProps = {
    name: 'defaultName',
    age: 25,
    height: 180
}

class SonClassNoCon extends Component {
    // constructor(props) {  // 非必须可以省略 1. Component父类源码中传入了 props 2. 派生类默认写法将传入的参数通过super的方式传入父类
    //     super(props) // 传给父类的属性最终是通过call 的形式挂载到当前子类this上 具体可以进行babel转换成es5后查看
    // }

    // es6 中的 class field 属性
    static propTypes = { // 类属性
        name: PropTypes.string,
        age: PropTypes.number.isRequired, // 必传参数
    }

    static defaultProps = {
        name: 'defaultName',
        age: 25,
        height: 180
    }

    render() {
        const { name, age, height } = this.props
        return (
            <div>
                类子组件：{ name + ' ' + age + ' ' + height }
            </div>
        )
    }
}

function SonFun(props) {
    const { name, age } = props
    return (
        <div>
            函数子组件：{ name + ' ' + age }
        </div>
    )
}

SonFun.propTypes = {
    name: PropTypes.string
}

export default Parent;