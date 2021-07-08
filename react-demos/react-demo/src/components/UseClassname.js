import React, { PureComponent } from 'react'
import classNames from 'classnames'

export default class UseClassname extends PureComponent {
    render() {
        const isActive = true
        const isFoo = true
        const isBar = false
        const errClass = 'error'
        const warnClass = null // undefined 0
        return (
            <div>
                {/* 原生中添加 className 的方法 */}
                <h5 className={'foo bar baz'} >classnames title 1</h5>
                <h5 className={'title' + (isActive ? ' active' : '') } >classnames title 2</h5>
                <h5 className={['title', (isActive ? ' active' : '')].join(' ')} >classnames title 3</h5>

                {/* classnames库添加class */}
                <h5 className='foo bar baz' >classnames title 4</h5>
                <h5 className={classNames('foo bar baz')} >classnames title 5</h5>
                <h5 className={classNames({'active': isActive, 'bar': isBar, 'foo': isFoo}, 'title')} >classnames title 6</h5>
                <h5 className={classNames('foo', errClass, warnClass, { "active": isActive })} >classnames title 7</h5>
                <h5 className={classNames(['active', 'title'])} >classnames title 8</h5>
                <h5 className={classNames(['active', 'title', {'foo': isFoo}])} >classnames title 9</h5>
            </div>
        )
    }
}
