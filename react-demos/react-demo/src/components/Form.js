import React, { PureComponent } from 'react'

export default class Form extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            gender: '', // 无效值 默认选中第一项
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="username">
                        用户名： 
                        {/* 受控组件 */}
                        <input id="username" type="text" name="username" value={ this.state.username } onChange={e => this.handleChange(e)} />
                    </label>
                    <label htmlFor="gender">
                        性别： 
                        <select id="gender" name="gender" value={ this.state.gender } onChange={e => this.handleChange(e)}>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                    </label>
                    <input type="submit" value="提交" />
                </form>
            </div>
        )
    }
    handleSubmit(e) {
        console.log(e)
        e.preventDefault()
        console.log(this.state)
    }
    handleChange(e) {
        console.log(e)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}
