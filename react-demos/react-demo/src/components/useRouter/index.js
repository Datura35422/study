import React from 'react'
import {
    BrowserRouter,
    NavLink,
    Link,
    Route,
    Switch
} from 'react-router-dom'
import Home from './Home'
import About from './About'

export default function useRouter() {
    return (
        <BrowserRouter>
            {/* <Link to='/'>首页</Link>
            <Link to='/about'>关于</Link> */}
            <NavLink exact to='/' activeStyle={{color: 'red'}}>首页</NavLink>
            <NavLink to='/about/123' activeStyle={{color: 'red'}}>关于</NavLink>

            <Switch>
                 {/* 路径匹配通常是模糊匹配 只有根路径时需要设置精确匹配 */}
                <Route exact path='/'>
                    <Home></Home>
                </Route>

                <Route path='/about' component={About}></Route>
            </Switch>
        </BrowserRouter>
    )
}
