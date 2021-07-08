// 优化 connect 工具函数 将 store 利用 context 抽离出去
// 减少业务代码耦合

import React, { PureComponent } from "react"
import { StoreContext } from "./context"

export default function connect(mapStateToProps, mapDispachToProp) {
     // 高阶组件
     return function enhanceHOC(WrappedComponend) {
        class EnhanceComponent extends PureComponent {
            constructor(props, context) {
                super(props, context)

                this.state = {
                    // 返回组件中需要的 state
                    storeState: mapStateToProps(context.getState())
                }
            }

            componentDidMount() {
                // 建立监听
                this.unsubscribe = this.context.subscribe(() => {
                    this.setState({
                        storeState: mapStateToProps(this.context.getState())
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
                        {...mapStateToProps(this.context.getState())} 
                        {...mapDispachToProp(this.context.dispatch)} />
            }
        }

        EnhanceComponent.contextType = StoreContext

        return EnhanceComponent
    }
}