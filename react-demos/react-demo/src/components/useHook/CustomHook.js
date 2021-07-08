import React, { useEffect, useState } from 'react'

/**
 * 需求： 所有组件在创建喝销毁时都进行打印
 * 组件被创建：打印 组件被创建了
 * 组件被销毁：打印 组件被销毁了
 * @returns 
 */
function useLoggerLife(name) {
    useEffect(() => {
        console.log(`${name} 被创建`)
        return () => {
            console.log(`${name} 被销毁`)
        }
    }, [])
}

const Test = () => {
    useLoggerLife('Test')
    return (
        <div>test component</div>
    )
}

export default function CustomLifeHook() {
    const [show, setShow] = useState(true)
    useLoggerLife('CustomLifeHook')
    return (
        <div>
            <hr />
            <h4>custom hook</h4>
            <button onClick={() => setShow(!show)}>switch show</button>
            { show && <Test></Test> }
        </div>
    )
}
