import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import {
  DATA_PREFIX
} from '../utils/constants'
import {
  getSongDetailAction,
} from '../store/actionCreators'
import {
  formatImgSize,
  formatDate,
  formatPlayUrl,
} from '@/utils/format'

import { Slider } from 'antd'
import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator,
} from './style'

const ids = 1499175682

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
  } = useSelector(state => ({
    currentSong: state.getIn([DATA_PREFIX, 'currentSong'])
  }), shallowEqual)
  const dispatch = useDispatch()

  // other hooks
  const audioRef = useRef()
  const formatDateRule = useRef('mm:ss')
  useEffect(() => {
    dispatch(getSongDetailAction({
      ids
    }))
  }, [dispatch])
  useEffect(() => {
    audioRef.current.src = formatPlayUrl(currentSong.id)
    setDuration(currentSong.dt)
  }, [currentSong])

  // other handle
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
    }
  }, [duration, isChanging])

  // Slider 组件事件 传入子组件中
  const sliderChange = useCallback(e => {
    setProgress(e)
    !isChanging && setIsChanging(true)
  }, [isChanging])

  const sliderAfterChange = useCallback(e => {
    const currentTime = (e / 100) * duration
    audioRef.current.currentTime = currentTime / 1000 // s
    setCurrentTime(currentTime)
    setProgress(e)
    setIsChanging(false)

    if (!isPlaying) {
      play()
    }
  }, [duration, isPlaying, play])

  return (
    <PlaybarWrapper className='sprite_player'>
      <div className='content w980'>
        <Control isPlaying={ isPlaying }>
          <button className='sprite_player prev'></button>
          <button className='sprite_player play' onClick={() => play() }></button>
          <button className='sprite_player next'></button>
        </Control>
        <PlayInfo>
          <div className='image'>
            <img 
              src={ formatImgSize(currentSong?.al?.picUrl || '', 35) } 
              alt={ currentSong.name } />
          </div>
          <div className='info'>
            <div className='song'>
              <span>{ currentSong.name }</span>
              <a className='singer-name' href='/todo'>{ currentSong?.ar?.[0]?.name || '' }</a>
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
        <Operator>
          <div className='left'>
            <button className='sprite_player btn favor'></button>
            <button className='sprite_player btn share'></button>
          </div>
          <div className='right sprite_player'>
            <button className='sprite_player btn volume'></button>
            <button className='sprite_player btn loop'></button>
            <button className='sprite_player btn playlist'>12</button>
          </div>
        </Operator>
      </div>
      <audio ref={ audioRef } onTimeUpdate={ timeupdate } />
    </PlaybarWrapper>
  )
})
