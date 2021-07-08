import React, { PureComponent } from 'react'
import Style from './style.module.css'


export default class UseStyle extends PureComponent {
    render() {
        return (
            <div>
                <div className={ Style.title }>use style component</div>
            </div>
        )
    }
}
