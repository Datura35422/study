import React, { PureComponent } from 'react'
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';

import './style.css'

export default class UseTransition extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            show: true,
            isOn: true,
            mode: 'out-in', // in-out
            list: ['xxx', 'yyy', 'zzz']
        }
    }
    
    render() {
        const { show, isOn, mode, list } = this.state
        return (
            <div>
                <button onClick={e => this.setState({show: !show})}>显示 / 隐藏</button>
                <CSSTransition 
                    in={show} 
                    timeout={200} 
                    classNames='alert' 
                    unmountOnExit={true} 
                    appear
                    onEnter={el => console.log('开始进入')}
                    onEntering={el => console.log('正在进入')}
                    onEntered={el => console.log('已经进入')}
                    onExit={el => console.log('开始离开')}
                    onExiting={el => console.log('正在离开')}
                    onExited={el => console.log('已经离开')}
                >
                    <h3>CSSTransition Demo</h3>
                </CSSTransition>
                <SwitchTransition mode={mode}>
                    <CSSTransition key={isOn ? 'on' : 'off'} classNames="fade" timeout={1000} >
                        <button onClick={e => this.setState({ isOn: !isOn })}>
                            {isOn ? 'on' : 'off'}
                        </button>
                    </CSSTransition>
                </SwitchTransition>
                <TransitionGroup>
                    {
                        list.map((item, index) => (
                            <CSSTransition key={index} classNames="alert" timeout={300}>
                                <div>{ item }</div>
                            </CSSTransition>
                        ))
                    }
                </TransitionGroup>
                <button onClick={e => this.setState({ list: [...list, 'mmm'] })}>添加新元素</button>
            </div>
        )
    }
}
