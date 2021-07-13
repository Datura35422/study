import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
  formatCount,
  formatImgSize,
} from '@/utils/format'

import {
  SongsCoverWrapper,
} from './style'

const RMSongsCover = memo(function RMSongsCover(props) {
  const { info } = props
  return (
    <SongsCoverWrapper>
      <div className='cover-top'>
        <img src={ formatImgSize(info.picUrl, 140) } alt={ info.name } />
        <div className='sprite_cover cover'>
          <div className='sprite_cover info'>
            <span>
              <i className='sprite_icon headset'></i>
              { formatCount(info.playCount) }
            </span>
            <i className='sprite_icon play'></i>
          </div>
        </div>
      </div>
      <div className='cover-bottom'>
        { info.name }
      </div>
      <div className='cover-source'></div>
    </SongsCoverWrapper>
  )
})

RMSongsCover.propTypes = {
  info: PropTypes.object.isRequired
}

export default RMSongsCover
