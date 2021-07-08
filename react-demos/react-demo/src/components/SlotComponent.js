import React, { Component } from 'react'

class SlotComponent extends Component {
    render() {
        return (
            <div>
                <Slot>
                    <div>aaaa</div>
                    <div>bbbb</div>
                </Slot>
                <div>================</div>
                <Slot2 leftSlot={<div>xxxx</div>} 
                    rightSlot={<div>yyyy</div>}></Slot2>
            </div>
        )
    }
}

class Slot extends Component {
    render() {
        const { children } = this.props
        return (
            <div>
                { children[0] }
                <div>-------------------</div>
                { children[1] }
            </div>
        )
    }
}

class Slot2 extends Component {
    render() {
        const { leftSlot, rightSlot } = this.props
        return (
            <div>
                { leftSlot }
                <div>-------------------</div>
                { rightSlot }
            </div>
        )
    }
}


export default SlotComponent