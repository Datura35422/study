import React, { PureComponent } from "react"
import store from "../store"

/**
 * 建立 react 与 redux 的连接
 * @param {function} mapStateToProps 组件中需要使用的 store 中的数据映射到 props 中，返回值为对象
 * @param {function} mapDispachToProp 组件中需要派发的 action 映射到 props 中，返回值为对象
 */
export function connect(mapStateToProps, mapDispachToProp) {
    // 高阶组件
    return function enhanceHOC(WrappedComponend) {
        return class extends PureComponent {
            constructor(props) {
                super(props)

                this.state = {
                    // 返回组件中需要的 state
                    storeState: mapStateToProps(store.getState())
                }
            }

            componentDidMount() {
                // 建立监听
                this.unsubscribe = store.subscribe(() => {
                    this.setState({
                        storeState: mapStateToProps(store.getState())
                    })
                })
            }

            componentWillUnmount() {
                // 取消监听
                this.unsubscribe()
            }

            render() {
                // props 穿透
                return <WrappedComponend 
                        {...this.props} 
                        {...mapStateToProps(store.getState())} 
                        {...mapDispachToProp(store.dispatch)} />
            }
        }
    }
}