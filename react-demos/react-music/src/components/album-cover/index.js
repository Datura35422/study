import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
  formatImgSize
} from '@/utils/format'

import {
  AlbumCoverWrapper
} from './style'

const RMAlbumCover = memo(function RMAlbumCover(props) {
  const { info, size, bgp } = props
  return (
    <AlbumCoverWrapper 
      width={ size.width }
      height={ size.height }
      bgp={ bgp }>
      <div className='album-image'>
        <img src={ formatImgSize(info.picUrl, size.width, size.height) } alt={ info.name } />
        <a href='/discover/recommend' className='no-link image_cover cover'>{ info.name }</a>
      </div>
      <div className='album-name text-nowrap'>{ info.name }</div>
      <div className='artist text-nowrap'>{ info.artist.name }</div>
    </AlbumCoverWrapper>
  )
})

RMAlbumCover.propTypes = {
  info: PropTypes.object.isRequired,
  size: PropTypes.object,
  bgp: PropTypes.number
}

RMAlbumCover.defaultProps = {
  size: {
    height: 130,
    width: 153
  },
  bgp: -845
}

export default RMAlbumCover
