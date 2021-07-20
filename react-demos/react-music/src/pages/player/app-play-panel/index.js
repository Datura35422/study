import React, { memo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import {
  formatImgSize,
} from '@/utils/format'
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

  return (
    <PanelWrapper>
      <RMPlayHeader />
      <div className='main'>
        { currentSong?.al?.picUrl && <img className='image' src={ formatImgSize(currentSong.al.picUrl, 980) } alt='' /> }
        <RMPlayList />
        <RMLyricPanel />
      </div>
    </PanelWrapper>
  )
})
