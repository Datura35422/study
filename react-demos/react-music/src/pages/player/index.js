import React, { memo } from 'react'

import {
  PlayerWrapper,
  PlayerLeft,
  PlayerRight,
} from './style'

export default memo(function RMPlayer() {
  return (
    <PlayerWrapper>
      <div className="content w980">
        <PlayerLeft></PlayerLeft>
        <PlayerRight></PlayerRight>
      </div>
    </PlayerWrapper>
  )
})
