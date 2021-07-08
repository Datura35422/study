import React, { useCallback, useState, memo } from 'react'

const Button = memo(props => {
    console.log('Button 重新渲染 ', props.title)
    return (
        <button onClick={props.callback}>Button { props.title } counter</button>
    )
})

export default function UseCallback() {
    const [counter, setCounter] = useState(0)
    const [isShow, setIsShow] = useState(true)

    // 每次重新渲染时都会重新创建并执行
    const callback = () => {
        console.log('callback')
        setCounter(counter + 1)
    }

    const callback2 = useCallback(() => {
        console.log('callback2')
        setCounter(counter + 1)
    }, [counter]) // 如果没有任何依赖 则设置空数组 表示只会在挂载组件时 定义一次 闭包环境保留定义时的数值

    return (
        <div>
            <hr />
            <h4>useCallback counter: { counter }</h4>
            <Button title='callback1' callback={callback}></Button>
            <Button title='callback2' callback={callback2}></Button>
            <button onClick={() => { setIsShow(!isShow) }}>switch isShow</button>
        </div>
    )
}
