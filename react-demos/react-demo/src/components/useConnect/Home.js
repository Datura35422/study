import React, { PureComponent } from 'react'
// import connect from '../../utils/connect'
import connect2 from '../../utils/connect2'
import {
    incrementAction,
    addNumberAction,
    // getHomeMultidataAction,
    fetchHomeMultidataAction,
} from '../../store/actionCreators'

// function Home(props) {
//     return (
//         <div>
//             <h4>Home - 当前计数： {props.counter}</h4>
//             <div>
//                 <button onClick={e => props.increment()}>+1</button>
//                 <button onClick={e => props.addNumber(5)}>+5</button>
//             </div>
//         </div>
//     )
// }

class Home2 extends PureComponent {
    componentDidMount() {
        // 请求数据
        this.props.getHomeMultidata()
    }

    render() {
        const props = this.props
        return (
            <div>
                <h4>Home - 当前计数： {props.counter}</h4>
                <div>
                    <button onClick={e => props.increment()}>+1</button>
                    <button onClick={e => props.addNumber(5)}>+5</button>
                </div>
                <ul>
                    <li>banners title</li>
                    {/* {
                        props.banners.map(item => (
                            <li key={ item.acm }>{ item.title }</li>
                        ))
                    } */}
                </ul>
                <ul>
                    <li>recommends title</li>
                    {/* {
                        props.recommends.map(item => (
                            <li key={ item.acm }>{ item.title }</li>
                        ))
                    } */}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        counter: state.counterInfo.counter,
        banners: state.counterInfo.banners,
        recommends: state.homeInfo.recommends
    }
}

const mapDipatchToProps = dispatch => {
    return {
        increment() {
            dispatch(incrementAction())
        },
        addNumber(num) {
            dispatch(addNumberAction(num))
        },
        getHomeMultidata() {
            // dispatch(getHomeMultidataAction)
            dispatch(fetchHomeMultidataAction)
        }
    }
}

// export default connect(mapStateToProps, mapDipatchToProps)(Home)
// export default connect2(mapStateToProps, mapDipatchToProps)(Home)
export default connect2(mapStateToProps, mapDipatchToProps)(Home2)