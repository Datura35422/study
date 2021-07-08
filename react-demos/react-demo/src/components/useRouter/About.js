import React, { PureComponent } from 'react'
import {
    NavLink,
    Switch,
    Route
} from 'react-router-dom'

function AboutDetail(props) {
    console.log(props.match.params)
    return <h4>About</h4>
}

export default class About extends PureComponent {
    render() {
        return (
            <div>
                <NavLink exact to='/about/123' activeStyle={{color: 'green'}}>关于我们</NavLink>
                <NavLink to='/about/history' activeStyle={{color: 'green'}}>历史</NavLink>
                <NavLink to='/about/culture' activeStyle={{color: 'green'}}>文化</NavLink>
                
                <Switch>
                    <Route exact path='/about/:id' component={AboutDetail}></Route>
                    <Route path='/about/history'>
                        <h4>历史</h4>
                    </Route>
                    <Route path='/about/culture'>
                        <h4>文化</h4>
                    </Route>
                </Switch>
            </div>
        )
    }
}
