import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
  HeaderWrapper
} from './style'

const RMThemeHeaderRecommend = memo(function RMThemeHeaderRecommend(props) {
  const { title, keywords } = props

  return (
    <HeaderWrapper className='sprite_02'>
      <div className='left'>
        <div className='title'>{ title }</div>
        <div className='keyword'>
          {
            keywords.map(item => (
              <div className='item' key={ item }>
                <span>{ item }</span>
                <span className='divider'></span>
              </div>
            ))
          }
        </div>
      </div>
      <div className='right'>
        <span>更多</span>
        <i className='sprite_02 icon'></i>
      </div>
    </HeaderWrapper>
  )
})

RMThemeHeaderRecommend.propTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.array
}

RMThemeHeaderRecommend.defaultProps = {
  keywords: []
}

export default RMThemeHeaderRecommend
