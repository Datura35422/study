import React, { memo } from 'react'

import RMPlayerInfo from './children/player-info'
import RMPlayerRelevant from './children/player-relevant'
import RMPlayerSongs from './children/player-songs'
import {
  PlayerWrapper,
  PlayerLeft,
  PlayerRight,
} from './style'

export default memo(function RMPlayer() {
  return (
    <PlayerWrapper>
      <div className="content w980">
        <PlayerLeft>
          <RMPlayerInfo />
        </PlayerLeft>
        <PlayerRight>
          <RMPlayerSongs />
          <RMPlayerRelevant />
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
})
