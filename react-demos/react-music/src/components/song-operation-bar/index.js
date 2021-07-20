import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
  OperationBarWrapper,
} from './style'

const RMSongOperationBar = memo(function RMSongOperationBar(props) {
  const { favorTitle, shareTitle, downloadTitle, commentTitle } = props;

  return (
    <OperationBarWrapper>
      <span className="play">
        <a href="/abc" className="play-icon sprite_button">
          <span className="play sprite_button">
            <i className="sprite_button"></i>
            <span>播放</span>
          </span>
        </a>
        <a href="/abc" className="add-icon sprite_button">+</a>
      </span>
      <a href="/abc" className="item sprite_button">
        <i className="icon favor-icon sprite_button">{ favorTitle }</i>
      </a>
      <a href="/abc" className="item sprite_button">
        <i className="icon share-icon sprite_button">{ shareTitle }</i>
      </a>
      <a href="/abc" className="item sprite_button">
        <i className="icon download-icon sprite_button">{ downloadTitle }</i>
      </a>
      <a href="/abc" className="item sprite_button">
        <i className="icon comment-icon sprite_button">({ commentTitle })</i>
      </a>
    </OperationBarWrapper>
  )
})

RMSongOperationBar.propTypes = {
  favorTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  shareTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  downloadTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  commentTitle: PropTypes.number,
}

RMSongOperationBar.defaultProps = {
  favorTitle: '收藏',
  shareTitle: '分享',
  downloadTitle: '下载',
  commentTitle: 0,
}

export default RMSongOperationBar
