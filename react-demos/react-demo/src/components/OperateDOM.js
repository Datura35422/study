import React, { PureComponent, createRef, forwardRef } from 'react'

class Home extends PureComponent {
    render() {
        return (
            <div>Home component</div>
        )
    }
}

const Profile = forwardRef(function (props, ref) {
    return (
        <div ref={ref} >Profile</div>
    )
})

export default class OperateDOM extends PureComponent {

    constructor(props) {
        super(props)

        this.titleRef = createRef()
        this.titleEl = null

        this.homeRef = createRef()
        this.profileRef = createRef()
    }

    render() {
        return (
            <div>
                <h4 ref={ this.titleRef }>ref object</h4>
                <h4 ref={ el => this.titleEl = el }>ref callback</h4>
                <button onClick={e => this.changeText()}>改变文本</button>
                <Home ref={ this.homeRef } />
                <Profile ref={ this.profileRef } />
                <button onClick={e => this.printRef()}>打印ref</button>
            </div>
        )
    }

    changeText() {
        console.log(this.titleRef.current) // 获取的数据是更改后的数据 console 异步
        this.titleRef.current.innerHTML = 'ref test'
        
        this.titleEl.innerHTML = 'ref test2'
    }

    printRef() {
        console.log(this.homeRef.current)
        console.log(this.profileRef.current)
    }
}


