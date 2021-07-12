import React, { memo } from 'react'

import RMTopBanner from './components/top-banners'
import RMHotRecommend from './components/hot-recommend'
import {
    RecommendWrap,
    Content,
    RecommendLeft,
    RecommendRight,
} from './style'

export default memo(function RMRecommend() {
    return (
        <RecommendWrap>
            <RMTopBanner />
            <Content className='w980'>
                <RecommendLeft>
                    <RMHotRecommend />
                </RecommendLeft>
                <RecommendRight></RecommendRight>
            </Content>
        </RecommendWrap>
    )
})

// 使用 hooks 改写
// import React, { memo, useEffect } from 'react'
// import { useSelector, useDispatch, shallowEqual } from 'react-redux'

// import { getTopBannersAction } from './store/actionCreators'

// function RMRecommend(props) {
//     const dispatch = useDispatch()
//     // useSelector 手动传入比较函数 能够提高性能优化 默认的是使用的 === 的方式进行浅层比较 会导致每次数据发生改变就会重新渲染组件 
//     // 即使数据不发生改变也会因为生成新的数据对象而比较失败
//     const { topBanners } = useSelector(state => ({
//         topBanners: state.getIn(['recommend', 'topBanners'])
//     }), shallowEqual)
    
//     console.log(topBanners)
//     useEffect(() => {
//         dispatch(getTopBannersAction())
//     }, [dispatch])

//     return (
//         <div>
//             RMRecommend
//         </div>
//     )
// }

// export default memo(RMRecommend)


// 使用传统用法
// import React, { memo, useEffect } from 'react'
// import { connect } from 'react-redux'

// import { getTopBannersAction } from './store/actionCreators'

// function RMRecommend(props) {
//     const { getTopBanners, topBanners } = props
    
//     console.log(props)
//     useEffect(() => {
//         getTopBanners()
//     }, [getTopBanners])

//     return (
//         <div>
//             RMRecommend {topBanners.length}
//         </div>
//     )
// }

// const mapStateToProps = state => {
//     return {
//         topBanners: state.recommend.topBanners
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         getTopBanners() {
//             dispatch(getTopBannersAction())
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(memo(RMRecommend))
