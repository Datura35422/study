import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {
  getHotRecommendsAction
} from '../../store/actionCreators'
import {
  DATA_PREFIX,
  HOT_RECOMMENT_LIMIT
} from '../../utils/constants'

import RMThemeHeaderRecommend from '@/components/theme-header/recommend'
import RMSongsCover from '@/components/songs-cover'
import {
  RecommendWrapper
} from './style'

const keywords = ['华语', '流行', '摇滚', '民谣', '电子']

export default memo(function RMHotRecommend() {

  const { hotRecommends } = useSelector(state => ({ 
    hotRecommends: state.getIn([DATA_PREFIX, 'hotRecommends'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHotRecommendsAction({
      limit: HOT_RECOMMENT_LIMIT
    }))
  }, [dispatch])

  return (
    <RecommendWrapper>
      <RMThemeHeaderRecommend 
        title='热门推荐' 
        keywords={keywords}/>
      <div className='recommend-list'>
        {
          hotRecommends.map(item => (
            <RMSongsCover key={ item.id } info={ item }>{ item.name }</RMSongsCover>
          ))
        }
      </div>
    </RecommendWrapper>
  )
})
