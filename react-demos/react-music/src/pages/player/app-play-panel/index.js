import React, { memo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import {
  DATA_PREFIX
} from '../utils/constants'

import RMPlayHeader from './children/play-header'
import RMPlayList from './children/play-list'
import RMLyricPanel from './children/lyric-panel'
import {
  PanelWrapper,
} from './style'

export default memo(function RMAppPlayPanel() {
  const { currentSong } = useSelector(state => ({
    currentSong: state.getIn([DATA_PREFIX, 'currentSong'])
  }), shallowEqual)

  console.log(currentSong)

  return (
    <PanelWrapper>
      <RMPlayHeader />
      <div className='main'>
        { currentSong?.al?.picUrl && <img className='image' src={ currentSong.al.picUrl } alt='' /> }
        <RMPlayList />
        <RMLyricPanel />
      </div>
    </PanelWrapper>
  )
})
