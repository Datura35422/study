import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {
  formatImgSize
} from '@/utils/format'
import {
  getSimiPlaylistAction, 
} from '../../store/actionCreators'
import { 
  DATA_PREFIX, 
} from '../../utils/constants'

import RMThemeHeaderPlayer from '@/components/theme-header/player'
import {
  PlayerSongsWrapper,
} from './style'

export default memo(function RMPlayerSongs() {
  const {
    currentSong,
    simiPlaylist,
  } = useSelector(state => ({
    currentSong: state.getIn([DATA_PREFIX, 'currentSong']),
    simiPlaylist: state.getIn([DATA_PREFIX, 'simiPlaylist']),
  }), shallowEqual)

  const dispatch = useDispatch()
  useEffect(() => {
    currentSong.id && dispatch(getSimiPlaylistAction({
      id: currentSong.id
    }))
  }, [dispatch, currentSong])

  return (
    <PlayerSongsWrapper>
      <RMThemeHeaderPlayer title='包含这首歌的歌单' />
      <div className='songs'>
        {
          simiPlaylist && simiPlaylist.map((item, index) => {
            return (
              <div className='song-item' key={item.id}>
                <a className='image' href='/#'>
                  <img src={ formatImgSize(item.coverImgUrl, 50) } alt='' />
                </a>
                <div className='info text-nowrap'>
                  <a href='#/' className='name'>{item.name}</a>
                  <div className='auchor'>
                    by 
                    <a href='#/' className='nickname'>{item.creator.nickname}</a>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </PlayerSongsWrapper>
  )
})
