import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
  HeaderWrapper
} from './style'

const RMThemeHeaderPlayer = memo(function RMThemeHeaderPlayer(props) {
  const { title } = props
  return (
    <HeaderWrapper>
      <h3>{ title }</h3>
    </HeaderWrapper>
  )
})

RMThemeHeaderPlayer.propTypes = {
  title: PropTypes.string.isRequired
}

export default RMThemeHeaderPlayer

