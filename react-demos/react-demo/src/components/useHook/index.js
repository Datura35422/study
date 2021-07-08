import React from 'react'
import CounterClass from './CounterClass'
import CounterHook from './CounterHook'
import UseContext from './UseContext'
import UseReducer from './UseReducer'
import UseCallback from './UseCallback'
import UseMemo from './UseMemo'
import UseRef from './UseRef'
import UseImperativeHandle from './UseImperativeHandle'
import CustomLifeHook from './CustomHook'

export default function UseHook() {
    return (
        <div>
            <CounterClass></CounterClass>
            <CounterHook></CounterHook>
            <UseContext></UseContext>
            <UseReducer></UseReducer>
            <UseCallback></UseCallback>
            <UseMemo></UseMemo>
            <UseRef></UseRef>
            <UseImperativeHandle></UseImperativeHandle>
            <CustomLifeHook></CustomLifeHook>
        </div>
    )
}
