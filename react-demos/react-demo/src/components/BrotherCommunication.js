// 跨组件通信
// 方法一：逐层传递
// 方法二：Context

import React, { Component } from 'react'

// =============================方法一======================================================
class BrotherCommunication extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nickname: 'xxxx',
            level: 5
        }
    }

    render() {
        return (
            <div>
                <PropFunction {...this.state} />
            </div>
        );
    }
}

function PropFunction(props) {
    return (
        <div>
            <div>=====================props center=========================</div>
            {/* 属性展开 */}
            <GrandSon {...props} />
        </div>
    )
}

function GrandSon(props) {
    return (
        <div>
            <div>nickname: { props.nickname }</div>
            <div>level: { props.level }</div>
        </div>
    )
}
 
// ======================================================================================

// ==============================方法二 context =========================================
// 默认值的作用 如果子组件向上找没有找到context所设置的值 则会使用最近的 context 的默认值
// 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
// 此默认值有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
const defaultValue = {
    nickname: 'default value',
    level: -1
}
// 创建 Context对象
const UserContext = React.createContext(defaultValue)

class BrotherCommunication2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nickname: 'yyyy',
            level: 5
        }
    }

    render() {
        return (
            <div>
                <UserContext.Provider value={this.state}>
                    <ClassCenterCom />
                </UserContext.Provider>
                {/* <ClassCenterCom /> */}
            </div>
        )
    }
}

class ClassCenterCom extends Component {
    render() {
        return (
            <div>
                <div>==================context center==========================</div>
                <ClassGrandSon />
                <FunGrandSon />
            </div>
        )
    }
}

class ClassGrandSon extends Component {
    // static contextType = UserContext // 另一种写法
    render() {
        const { nickname, level } = this.context
        return (
            <div>
                <div>class component</div>
                <div>nickname: { nickname }</div>
                <div>level: { level }</div>
            </div>
        )
    }
}

ClassGrandSon.contextType = UserContext

function FunGrandSon() {
    return (
        <UserContext.Consumer>
            {
                value => {
                    return (
                        <div>
                            <div>functional component</div>
                            <div>nickname: { value.nickname }</div>
                            <div>level: { value.level }</div>
                        </div>
                    )
                }
            }
        </UserContext.Consumer>
    )
}

export {
    BrotherCommunication,
    BrotherCommunication2
}