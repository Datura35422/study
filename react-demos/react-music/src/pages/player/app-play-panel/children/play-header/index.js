import React, { memo, useCallback } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import {
  DATA_PREFIX,
} from '../../../utils/constants'
import {
  changePlayerPanelAction,
  changePlayListAction,
} from '../../../store/actionCreators'

import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight,
} from './style'

export default memo(function RMPlayerHeader() {
  const { 
    currentSong,
    playList,
  } = useSelector(state => ({
    currentSong: state.getIn([DATA_PREFIX, 'currentSong']),
    playList: state.getIn([DATA_PREFIX, 'playList']) || [],
  }), shallowEqual)

  const dispatch = useDispatch()
  const onClosePlayerPanel = useCallback(() => {
    dispatch(changePlayerPanelAction(false))
  }, [dispatch])

  const onRemoveAll = useCallback(() => {
    dispatch(changePlayListAction([]))
  }, [dispatch])

  return (
    <HeaderWrapper>
      <HeaderLeft>
        <h3>播放列表({ playList.length })</h3>
        <div className='operator'>
          <button>
            <i className='icon sprite_playlist favor'></i>
            收藏全部
          </button>
          <button onClick={ onRemoveAll }>
            <i className='icon sprite_playlist remove'></i>
            删除
          </button>
        </div>
      </HeaderLeft>
      <HeaderRight>
        { currentSong?.name || '' }
        <i className='sprite_playlist close' onClick={ onClosePlayerPanel }></i>
      </HeaderRight>
    </HeaderWrapper>
  )
})
