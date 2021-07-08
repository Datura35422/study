import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Title = styled.h5`
    text-align: center;
    color: palevioletred;
`

const Subtitle = styled.div`
    width: 200px;
    height: 20px;
    background: ${props => props.color};
`
// props 穿透
// attrs的使用
// 传入 state 作为 props 属性
const Input = styled.input.attrs({
    placeholder: '请输入',
    width: '200px',
})`
    width: ${props => props.width};
    height: 28px;
    color: ${props => props.color};
`


export default class UseStyled extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            color: 'red'
        }
    } 
    render() {
        return (
            <div>
                <Title>styled component title</Title>
                <Subtitle color='#ccc'>subtitle</Subtitle>
                <Input type="text" color={this.state.color}></Input>
            </div>
        )
    }
}
