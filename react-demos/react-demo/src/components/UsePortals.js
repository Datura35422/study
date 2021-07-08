import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

const el = document.createElement('div')
document.body.append(el)

class Home extends PureComponent {
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            el
        )
    }
}

class UsePortals extends PureComponent {
    render() {
        return (
            <div>
                <Home>portals' content</Home>
            </div>
        )
    }
}

export default UsePortals