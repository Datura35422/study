import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getSimiSongsAction,
} from '../../store/actionCreators'
import {
  DATA_PREFIX
} from '../../utils/constants'

import RMThemeHeaderPlayer from '@/components/theme-header/player'
import {
  RelevantWrapper,
} from './style'

export default memo(function RMPlayerRelevant() {

  const {
    currentSong,
    simiSongs,
  } = useSelector(state => ({
    currentSong: state.getIn([DATA_PREFIX, 'currentSong']),
    simiSongs: state.getIn([DATA_PREFIX, 'simiSongs']),
  }))

  const dispatch = useDispatch()
  useEffect(() => {
    currentSong.id && dispatch(getSimiSongsAction({
      id: currentSong.id
    }))
  }, [dispatch, currentSong])

  return (
    <RelevantWrapper>
      <div className='songs'>
        <RMThemeHeaderPlayer title='相似歌曲' />
        {
          simiSongs && simiSongs.map(item => (
            <div className='song-item' key={ item.id }>
              <div className='info'>
                <div className='title'>
                  <a href='/todo'>{ item.name }</a>
                </div>
                <div className='artist'>
                  <a href="/todo">{ item.artists?.[0].name }</a>
                </div>
              </div>
              <div className='operate'>
                <i className='item icon-small play'></i>
                <i className='item icon-small add'></i>
              </div>
            </div>
          ))
        }
      </div>
    </RelevantWrapper>
  )
})
