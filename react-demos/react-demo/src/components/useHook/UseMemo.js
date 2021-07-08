import React, { useState, useMemo, memo } from 'react'

const calcSum = counter => {
    console.log('calcSum 重新计算')
    let total = 0
    for (let i = 1; i <= counter; i++) {
        total += i
    }
    return total
}

const Info = memo(props => {
    console.log('Info 组件重新渲染')
    return (
        <div>name: {props.info.name}, age: {props.info.age}</div>
    )
})

export default function UseMemo() {
    const [counter, setCounter] = useState(10)
    const [show, setShow] = useState(true)

    // const total = calcSum(counter) // 这种方式 组件的值改变重新渲染时会重新进行计算
    const total = useMemo(() => calcSum(counter), [counter]) // 使用 useMemo 依赖值不改变 则不会进行重新计算

    // 这种方式 组件重新渲染时会重新定义 info 导致组件重新渲染
    // const info = {
    //     name: 'xxx',
    //     age: 18
    // }
    // 使用 useMemo 依赖值不改变 则不会重新定义 搭配高阶组件 memo 进行使用
    const info = useMemo(() => ({name: 'xxx', age: 18}), [])

    return (
        <div>
            <hr />
            <h4>useMemo counter sum: { total }, show: { String(show) }</h4>
            <button onClick={() => setCounter(counter + 1)}> +1 </button>
            <button onClick={() => setShow(!show)}>switch show</button>
            <Info info={info}></Info>
        </div>
    )
}
