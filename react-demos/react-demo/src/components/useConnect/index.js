import React from 'react'
import Home from './Home'
import About from './About'
import { StoreContext } from '../../utils/context'
import store from '../../store'

export default function UseConnect() {
    return (
        <StoreContext.Provider value={ store }>
            <Home></Home>
            <About></About>
        </StoreContext.Provider>
    )
}