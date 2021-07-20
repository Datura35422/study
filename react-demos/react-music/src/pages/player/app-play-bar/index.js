import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'

import {
  DATA_PREFIX,
  PLAY_SEQUENCE,
} from '../utils/constants'
import {
  changePlaySequenceAction,
  changePlaySongAction,
  changePlayerPanelAction,
  changeCurrentLyricIndexAction,
  getStoragePlayListAction,
} from '../store/actionCreators'
import {
  formatImgSize,
  formatDate,
  formatPlayUrl,
} from '@/utils/format'

import { Slider } from 'antd'
import RMAppPlayPanel from '../app-play-panel'
import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator,
} from './style'

export default memo(function RMAppPlayBar() {
  // props and state
  // 播放时间数据单位统一为 ms
  const [currentTime, setCurrentTime] = useState(0) // 以ms为单位
  const [duration, setDuration] = useState(0) // ms
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  // redux hooks
  const { 
    currentSong,
    playList,
    playSequence,
    currentLyrics,
    currentLyricsIndex,
    showPlayerPanel,
  } = useSelector(state => ({
    currentSong: state.getIn([DATA_PREFIX, 'currentSong']),
    playList: state.getIn([DATA_PREFIX, 'playList']),
    playSequence: state.getIn([DATA_PREFIX, 'playSequence']),
    currentLyrics: state.getIn([DATA_PREFIX, 'currentLyrics']),
    currentLyricsIndex: state.getIn([DATA_PREFIX, 'currentLyricsIndex']),
    showPlayerPanel: state.getIn([DATA_PREFIX, 'showPlayerPanel']),
  }), shallowEqual)
  const dispatch = useDispatch()

  // other hooks
  const audioRef = useRef()
  const formatDateRule = useRef('mm:ss')
  useEffect(() => {
    if (Object.keys(currentSong).length === 0) {
      return
    }
    audioRef.current.src = formatPlayUrl(currentSong.id)
    setDuration(currentSong.dt)
    // chrome 初始自动播放会报错
    audioRef.current.play().then(() => {
      setIsPlaying(true)
    }).catch(err => {
      console.log(err)
      setIsPlaying(false)
    })
  }, [currentSong, setIsPlaying])
  useEffect(() => {
    dispatch(getStoragePlayListAction())
  }, [dispatch])

  // other handle
  const replay = useCallback(() => {
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }, [])

  const play = useCallback(() => {
    if (!isPlaying) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [isPlaying])
  // 合成事件 onTimeUpdate https://zh-hans.reactjs.org/docs/events.html#media-events
  const timeupdate = useCallback(e => {
    // Slider 正在改变时 不设置当前播放时间
    if (!isChanging) {
      const currentTime = e.target.currentTime * 1000 // s * 1000 -> ms
      setCurrentTime(currentTime)
      setProgress((currentTime / duration) * 100)
      // 设置歌词
      let currentIndex = 0
      for (; currentIndex < currentLyrics.length; currentIndex++) {
        if (currentTime <= currentLyrics[currentIndex].time) {
          break
        }
      }
      currentIndex = currentIndex - 1
      // 防止重复设置index
      currentLyricsIndex !== currentIndex && dispatch(changeCurrentLyricIndexAction(currentIndex))
    }
  }, [duration, isChanging, currentLyrics, dispatch, currentLyricsIndex])

  // 歌曲播放自然结束
  const timeEnded = useCallback(() => {
    // 判断当前播放模式
    if (playSequence === PLAY_SEQUENCE.LOOP || playList.length === 1) {
      // 单曲循环
      replay()
    } else {
      dispatch(changePlaySongAction(1))
    }
  }, [playSequence, playList, replay, dispatch])

  // Slider 组件事件 传入子组件中
  const sliderChange = useCallback(e => {
    setProgress(e)
    !isChanging && setIsChanging(true)
  }, [isChanging])

  const sliderAfterChange = useCallback(e => {
    const currentTime = (e / 100) * duration
    // 设置原生 DOM 的属性获取到原生 DOM 的实例之后进行设置
    audioRef.current.currentTime = currentTime / 1000 // s
    setCurrentTime(currentTime)
    setProgress(e)
    setIsChanging(false)

    if (!isPlaying) {
      play()
    }
  }, [duration, isPlaying, play])

  const onChangeSequence = useCallback(() => {
    dispatch(changePlaySequenceAction(playSequence))
  }, [dispatch, playSequence])

  const onChangePlaySong = useCallback(flag => {
    if (playList.length === 0) {
      return
    }
    // 如果当前列表只有一首歌 则重新播放
    if (playList.length === 1) {
      replay()
      return
    }
    dispatch(changePlaySongAction(flag))
  }, [dispatch, playList, replay])

  const onSwitchPlayerPanel = useCallback(() => {
    dispatch(changePlayerPanelAction(!showPlayerPanel))
  }, [dispatch, showPlayerPanel])

  return (
    <PlaybarWrapper className='sprite_player'>
      <div className='content w980'>
        <Control isPlaying={ isPlaying }>
          <button className='sprite_player prev' onClick={() => onChangePlaySong(-1) }></button>
          <button className='sprite_player play' onClick={() => play() }></button>
          <button className='sprite_player next' onClick={() => onChangePlaySong(1) }></button>
        </Control>
        <PlayInfo>
          <div className='image'>
            <NavLink to='/discover/song'>
              <img 
                src={ formatImgSize(currentSong?.al?.picUrl || '', 35) } 
                alt={ currentSong.name } />
            </NavLink>
          </div>
          <div className='info'>
            <div className='song'>
              <span>{ currentSong.name }</span>
              {
                currentSong?.ar?.length && currentSong.ar.map(item => (
                  <a className='singer-name' href='/todo' key={ item.id }>{ item?.name || '' }</a>
                ))
              }
            </div>
            <div className='progress'>
              <Slider 
                defaultValue='0'
                value={ progress }
                onChange={ sliderChange }
                onAfterChange={ sliderAfterChange }
              />
              <div className='time'>
                <span className='now-time'>{ formatDate(currentTime, formatDateRule.current) }</span>
                <span className='divider'>/</span>
                <span>{ formatDate(duration, formatDateRule.current) }</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={ playSequence }>
          <div className='left'>
            <button className='sprite_player btn favor'></button>
            <button className='sprite_player btn share'></button>
          </div>
          <div className='right sprite_player'>
            <button className='sprite_player btn volume'></button>
            <button className='sprite_player btn loop' onClick={() => onChangeSequence() }></button>
            <button className='sprite_player btn playlist' onClick={ onSwitchPlayerPanel }>{ playList.length }</button>
          </div>
        </Operator>
      </div>
      { showPlayerPanel && <RMAppPlayPanel /> }
      <audio ref={ audioRef } onTimeUpdate={ timeupdate } onEnded={ timeEnded } />
    </PlaybarWrapper>
  )
})
