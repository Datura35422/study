import React, { useState, useEffect } from 'react'

function TestShow() {
    useEffect(() => {
        console.log('组件挂载')
        console.log('订阅一些事件')
        // 可选的清除机制  React 会在组件卸载和更新的时候执行清除操作 会在执行当前 effect 之前对上一个 effect 进行清除 
        // 如果 effect 不需要清除则不需要设置返回函数
        return () => {
            console.log('组件卸载')
            console.log('取消订阅事件')
        }
    }, []) // 如果传入 [] 则表示只会在组件挂载和卸载时执行

    return (
        <div>test show</div>
    )
}

export default function CounterHook() {
    // Hook: useState 本身是一个函数，来自 react 包，参数为声明变量的初始值，返回值为数组 [当前的状态, 设置状态的函数]
    // 声明 counter 变量 初始值为0
    // const arr = userState(0) 
    // const counter = arr[0]
    // const setState = arr[1]
    const [ counter, setCounter ] = useState(0)
    const [ show, setShow ] = useState(true)

    // useEffect 会在每次 counter 更新后 DOM 渲染后都执行
    useEffect(() => {
        document.title = counter
        console.log('counter 更新')
    }, [counter]) // 仅在 counter 更改时更新 不传入第二个参数的话数据更新就会执行
    console.log('counter')
    return (
        <div>
            <hr />
            <h4>Hook 当前计数：{ counter }</h4>
            <button onClick={() => setCounter( counter + 1 )} > +1 </button>
            <button onClick={() => setCounter( counter - 1 )} > -1 </button>
            <button onClick={() => setShow( !show )} > switch show </button>
            { show && <TestShow /> }
        </div>
    )
}
