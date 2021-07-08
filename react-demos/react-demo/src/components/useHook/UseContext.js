import React, { createContext, useContext } from 'react'

const UserContext = createContext()
const ThemeContext = createContext()

function Son() {
    const sonUserInfo = useContext(UserContext)
    const sonTheme = useContext(ThemeContext)

    console.log(sonUserInfo, sonTheme)

    return (
        <div style={sonTheme}>
            { `name: ${ sonUserInfo.name }, age: ${ sonUserInfo.age }` }
        </div>
    )
}

export default function UseContext() {
    const userInfo = {
        name: 'xxx',
        age: 18
    }

    const themeData = {
        color: 'blue'
    }

    return (
        <UserContext.Provider value={userInfo}>
            <ThemeContext.Provider value={themeData}>
                <Son></Son>
            </ThemeContext.Provider>
        </UserContext.Provider>
    )
}
