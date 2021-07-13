import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  getRankingListAction
} from '../../store/actionCreators'
import {
  DATA_PREFIX,
  RANKING_IDX,
} from '../../utils/constants'

import RMThemeHeaderRecommend from '@/components/theme-header/recommend'
import RMRankingList from '../ranking-list'
import {
  RankingWrapper,
} from './style'

const NEW_BANKING = 'new'
const UP_BANKING = 'up'
const ORIGIN_BANKING = 'origin'

export default memo(function RMRecommendRanking() {
  const { upRanking, newRanking, originRanking } = useSelector(state => ({
    upRanking: state.getIn([DATA_PREFIX, 'upRanking']),
    newRanking: state.getIn([DATA_PREFIX, 'newRanking']),
    originRanking: state.getIn([DATA_PREFIX, 'originRanking']),
  }), shallowEqual)
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRankingListAction({
      idx: RANKING_IDX[NEW_BANKING],
    }, NEW_BANKING))
    dispatch(getRankingListAction({
      idx: RANKING_IDX[UP_BANKING],
    }, UP_BANKING))
    dispatch(getRankingListAction({
      idx: RANKING_IDX[ORIGIN_BANKING],
    }, ORIGIN_BANKING))
  }, [dispatch])

  return (
    <RankingWrapper>
      <RMThemeHeaderRecommend title='榜单' />
      <div className='ranking-info'>
        <RMRankingList info={ upRanking } />
        <RMRankingList info={ newRanking } />
        <RMRankingList info={ originRanking } />
      </div>
    </RankingWrapper>
  )
})
