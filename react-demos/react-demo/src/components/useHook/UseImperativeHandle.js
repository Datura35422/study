import React, { useRef, useImperativeHandle, forwardRef } from 'react'

const Input = forwardRef((props, ref) => {
    const sonInputRef = useRef()

    useImperativeHandle(ref, () => ({
        onFocus() {
            sonInputRef.current.focus()
        }
    }))

    return (
        <input ref={sonInputRef} type="text" />
    )
})

export default function UseImperativeHandle() {
    const inputRef = useRef()

    return (
        <div>
            <hr />
            <h4>usesImperativeHandle test</h4>
            <Input ref={inputRef} />
            <button onClick={() => inputRef.current.onFocus()}>onfocus</button>
        </div>
    )
}
