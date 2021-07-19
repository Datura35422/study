import React, { memo, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'

import {
  DATA_PREFIX
} from '../../../utils/constants'
import {
  formatDate
} from '@/utils/format'
import {
  getSongDetailAction,
} from '../../../store/actionCreators'

import {
  PlayListWrapper,
} from './style'

export default memo(function RMPlayList() {
  const {
    currentSongIndex,
    playList,
  } = useSelector(state => ({
    currentSongIndex: state.getIn([DATA_PREFIX, 'currentSongIndex']),
    playList: state.getIn([DATA_PREFIX, 'playList'])
  }), shallowEqual)

  const dispatch = useDispatch()

  const onPlayItem = useCallback(item => {
    dispatch(getSongDetailAction({
      ids: item.id
    }))
  }, [dispatch])

  return (
    <PlayListWrapper>
      {
        playList && playList.map((item, index) => (
          <div 
            className={ classnames('play-item', { active: currentSongIndex === index }) } 
            key={ item.id }
            onClick={e => onPlayItem(item)}>
            <div>{ item.name }</div>
            <div className='right'>
              <div className='singer text-nowrap'>{ item.ar && item.ar[0].name }</div>
              <div className='duration'>{ formatDate(item.dt, 'mm:ss') }</div>
              {/* TODO: 歌曲来源 */}
              <i className='sprite_playlist link'></i>
            </div>
          </div>
        ))
      }
    </PlayListWrapper>
  )
})
