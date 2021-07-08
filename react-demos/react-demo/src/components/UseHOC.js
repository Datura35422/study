import React, { PureComponent, createContext } from 'react'

// ================================================= 基础结构 ===========================================
// class Main extends PureComponent {
//     render() {
//         console.log('main:', this.props)
//         return (
//             <div>
//                 高阶组件
//             </div>
//         )
//     }
// }

// /**
//  * 高阶组件 返回类组件
//  * @param {Component} WrappedComponent 
//  * @returns 
//  */
// function enhanceComponent(WrappedComponent) {
//     return class NewComponent extends PureComponent {
//         render() {
//             console.log('enhanceComponent')
//             return <WrappedComponent {...this.props} />
//         }
//     }
// }

// /**
//  * 高阶组件 返回函数式组件
//  * @param {Component} WrappedComponent 
//  * @returns 
//  */
// function enhanceComponent2(WrappedComponent) {
//     return function NewComponent(props) {
//         return (
//             <WrappedComponent {...props} />
//         )
//     }
// }

// const EnhanceComponent = enhanceComponent(Main)

// export default EnhanceComponent

// ===================================================== 应用场景 ============================================================
// // 1. 在原有的组件上增加 props
// // 定义高阶组件
// function enhanceRegionProps(WrappedComponent) {
//     return props => {
//         return <WrappedComponent {...props} region="中国" />
//     }
// }
// // 定义组件： 场景，在原有的组件上增添显示区域
// class Home extends PureComponent {
//     render() {
//         return <h5>{`home - nickname: ${this.props.nickname}, level: ${this.props.level}, region: ${this.props.region}`}</h5>
//     }
// }

// class About extends PureComponent {
//     render() {
//         return <h5>{`about - nickname: ${this.props.nickname}, level: ${this.props.level}, region: ${this.props.region}`}</h5>
//     }
// }

// // 增强 属性值
// const EnhanceHome = enhanceRegionProps(Home)
// const EnhanceAbout = enhanceRegionProps(About)

// class Bar extends PureComponent {
//     render() {
//         return (
//             <div>
//                 <Home nickname="xxxx" level="90" />
//                 <About nickname="xxxx" level="90" />
//                 {/* 可以避免修改原来的定义方式 */}
//                 <EnhanceHome nickname="xxxx" level="90" />
//                 <EnhanceAbout nickname="xxxx" level="90" />
//             </div>
//         )
//     }
// }

// export default Bar

// 2. context 抽取重复代码

// 创建context
// const UserContext = createContext({
//     nickname: '默认',
//     level: -1,
//     region: '中国'
// })
// ------------默认做法-------------------------------------------
// class Home extends PureComponent {
//     render() {
//         return (
//             <UserContext.Consumer>
//                 {
//                     user => {
//                         return <h5>{`about - nickname: ${user.nickname}, level: ${user.level}, region: ${user.region}`}</h5>
//                     }
//                 }
//             </UserContext.Consumer>
//         )
//     }
// }

// class About extends PureComponent {
//     render() {
//         return (
//             <UserContext.Consumer>
//                 {
//                     user => {
//                         return <h5>{`about - nickname: ${user.nickname}, level: ${user.level}, region: ${user.region}`}</h5>
//                     }
//                 }
//             </UserContext.Consumer>
//         )
//     }
// }
// -------------改进------------------------------
// class Home extends PureComponent {
//     render() {
//         return (
//             <h5>{`home - nickname: ${this.props.nickname}, level: ${this.props.level}, region: ${this.props.region}`}</h5>
//         )
//     }
// }

// class About extends PureComponent {
//     render() {
//         return (
//             <h5>{`about - nickname: ${this.props.nickname}, level: ${this.props.level}, region: ${this.props.region}`}</h5>
//         )
//     }
// }

// // 定义一个高阶组件 抽取重复代码
// function withUser(WrappedComponent) {
//     return props => {
//         return (
//             <UserContext.Consumer>
//                 {
//                     user => {
//                         console.log(user)
//                         return <WrappedComponent {...props} {...user} />
//                     }
//                 }
//             </UserContext.Consumer>
//         )
//     }
// }

// const UserHome = withUser(Home)
// const UserAbout = withUser(About)

// class Main extends PureComponent {
//     render() {
//         const value = {
//             nickname: 'lallal',
//             level: 99,
//             region: '中国'
//         }
//         return (
//             <UserContext.Provider value={value}>
//                 <UserHome />
//                 <UserAbout />
//             </UserContext.Provider>
//         )
//     }
// }

// export default Main


// 3. 渲染鉴权操作

// function withAuth(WrappedComponent) {
//     return props => {
//         const { isLogin } = props
//         if (isLogin) {
//             return <WrappedComponent {...props} />
//         }
//         return <LoginPage />
//     }
// }

// class LoginPage extends PureComponent {
//     render() {
//         return <h5>Login</h5>
//     }
// }
// class CartPage extends PureComponent {
//     render() {
//         return <h5>CartPage</h5>
//     }
// }

// const AuthCartPage = withAuth(CartPage)

// class Main extends PureComponent {
//     render() {
//         return (
//             <div>
//                 <AuthCartPage isLogin={false} />
//             </div>
//         )
//     }
// }

// export default Main

// 4. 生命周期劫持
class Home extends PureComponent {
    render() {
        return (
            <h2>Home</h2>
        )
    }
// ------------------------默认写法 ------------------------
    // UNSAFE_componentWillMount() {
    //     this.beginTime = Date.now()
    // }

    // componentDidMount() {
    //     this.endTime = Date.now()
    //     console.log(this.endTime - this.beginTime)
    // }  
}

// ---------------------增强写法--------------------------
// 创建高阶组件
function withRenderTime(WrappedComponent) {
    return class RenderCom extends PureComponent {
        render() {
            return <WrappedComponent />
        }

        UNSAFE_componentWillMount() {
            this.beginTime = Date.now()
        }

        componentDidMount() {
            this.endTime = Date.now()
            console.log(`${WrappedComponent.name}渲染时间：`,this.endTime - this.beginTime)
        }  
    }
}

const RenderHome = withRenderTime(Home)

class Main extends PureComponent {
    render() {
        return (
            <div>
                <RenderHome />
            </div>
        )
    }
}

export default Main