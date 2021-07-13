import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getTopBannersAction } from '../../store/actionCreators'
import { DATA_PREFIX } from '../../utils/constants'

import { Carousel } from 'antd'
import {
  BannerWrapper,
  BannerLeft,
  BannerRight,
  BannerControl,
} from './style'

export default memo(function RMTopBanner() {
  // state 
  const [currentIndex, setCurrentIndex] = useState(0)

  // 组件和redux 关联：获取数据和进行操作
  const dispatch = useDispatch()
  const { topBanners } = useSelector(state => ({
      topBanners: state.getIn([DATA_PREFIX, 'topBanners']) || []
  }), shallowEqual)
  
  // 其他 hooks
  useEffect(() => {
    dispatch(getTopBannersAction())
  }, [dispatch])

  // 其他业务逻辑
  const bannerRef = useRef()
  const bannerBeforeChange = useCallback((form, to) => {
    setCurrentIndex(to)
  }, [])

  const bgImage = topBanners[currentIndex] && topBanners[currentIndex].imageUrl + '?imageView&blur=40x20'

  return (
    <BannerWrapper bgImage={ bgImage }>
      <div className='banner w980'>
        <BannerLeft>
          <Carousel 
            effect='fade' 
            ref={ bannerRef } 
            beforeChange={ bannerBeforeChange }
            autoplay>
            {
              topBanners.map(item => (
                <div key={ item.targetId }>
                  <img src={ item.imageUrl } alt={ item.typeTitle } />
                </div>
              ))
            }
          </Carousel>,
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <div className='btn left' onClick={() => bannerRef.current.prev()}></div>
          <div className='btn right' onClick={() => bannerRef.current.next()}></div>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})