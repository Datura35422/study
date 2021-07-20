import React, { memo, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import {
  formatImgSize
} from '@/utils/format'
import {
  DATA_PREFIX,
} from '../../utils/constants'

import RMSongOperationBar from '@/components/song-operation-bar'
import {
  InfoWrapper,
  InfoLeft,
  InfoRight,
} from './style'

export default memo(function RMPlayerInfo() {
  const [isSpread, setIsSpread] = useState(false)

  const {
    currentSong,
    currentLyrics,
  } = useSelector(state => ({
    currentSong: state.getIn([DATA_PREFIX, 'currentSong']),
    currentLyrics: state.getIn([DATA_PREFIX, 'currentLyrics']),
  }), shallowEqual)

  const showLyricLines = isSpread ? currentLyrics.length : 13
  
  return (
    <InfoWrapper>
      <InfoLeft>
        <div className='image'>
          { currentSong?.al?.picUrl && <img src={ formatImgSize(currentSong.al.picUrl, 198) } alt=''/> }
          <span className='image_cover cover'></span>
        </div>
        <div className='link'>
          <i className='sprite_icon2'></i>
          <a href='/todo'>生成外链播放器</a>
        </div>
      </InfoLeft>
      <InfoRight isSpread={ isSpread }>
        <div className='header'>
          <i className='icons'></i>
          <span className='title'>{ currentSong.name }</span>
        </div>
        <div className='singer'>
          <span>歌手：</span>
          <a href="/#" className="name">{ currentSong?.ar?.[0]?.name }</a>
        </div>
        <div className='album'>
          <span>所属专辑：</span>
          <a href="/#" className="name">{ currentSong?.al?.name }</a>
        </div>
        <RMSongOperationBar />
        <div className='lyric'>
          <div className='lyric-info'>
            {
              currentLyrics && currentLyrics.slice(0, showLyricLines).map((item, index) => (
                <p className='text' key={ index }>{ item.content }</p>
              ))
            }
          </div>
          <button className="lyric-control" onClick={ () => setIsSpread(!isSpread) }>
            { isSpread ? '收起' : '展开' }
            <i className="sprite_icon2"></i>
          </button>
        </div>
      </InfoRight>
    </InfoWrapper>
  )
})
