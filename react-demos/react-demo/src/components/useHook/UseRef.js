import React, { PureComponent, useRef, useState, useEffect } from 'react'

class Text extends PureComponent{
    render() {
        return (
            <div>class component text</div>
        )
    }
}

export default function UseRef() {
    const [counter, setCounter] = useState(0)

    const titleRef = useRef()
    const textRef = useRef(null)
    const oldCountRef = useRef(counter)

    useEffect(() => {
        oldCountRef.current = counter
    }, [counter])

    const changeText = () => {
        console.log(titleRef.current)
        console.log(textRef.current)
        titleRef.current.innerHTML = 'Hello world'
    }

    return (
        <div>
            <hr />
            <h4 ref={titleRef}>useRef hook</h4>
            <Text ref={textRef}></Text>
            <button onClick={() => changeText()}>change text</button>
            <div>上一次的数据：{ oldCountRef.current }</div>
            <div>当前的数据：{ counter }</div>
            <button onClick={() => setCounter(counter + 1)}> +1 </button>
        </div>
    )
}
