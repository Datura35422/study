import React, { memo, useCallback } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import {
  DATA_PREFIX,
} from '../../../utils/constants'
import {
  changePlayerPanelAction,
} from '../../../store/actionCreators'

import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight,
} from './style'

export default memo(function RMPlayerHeader() {
  const { currentSong } = useSelector(state => ({
    currentSong: state.getIn([DATA_PREFIX, 'currentSong'])
  }), shallowEqual)

  const dispatch = useDispatch()
  const onClosePlayerPanel = useCallback(() => {
    console.log('onClosePlayerPanel')
    dispatch(changePlayerPanelAction(false))
  }, [dispatch])

  return (
    <HeaderWrapper>
      <HeaderLeft>
        <h3>播放列表</h3>
        <div className='operator'>
          <button>
            <i className='icon sprite_playlist favor'></i>
            收藏全部
          </button>
          <button>
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
