import React, { memo, useRef, useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import classnames from 'classnames'

import {
  scrollTo
} from '@/utils/ui-helper'
import {
  DATA_PREFIX,
} from '../../../utils/constants'

import {
  PanelWrapper,
} from './style'

export default memo(function RMLyricPanel() {
  const {
    currentLyrics,
    currentLyricsIndex,
  } = useSelector(state => ({
    currentLyrics: state.getIn([DATA_PREFIX, 'currentLyrics']),
    currentLyricsIndex: state.getIn([DATA_PREFIX, 'currentLyricsIndex']),
  }), shallowEqual)

  const panelRef = useRef()
  useEffect(() => {
    // 防止循环设置自动滚动
    if (currentLyricsIndex > 0 && currentLyricsIndex < 3) {
      return
    }
    // 设置自动滚动 
    // 每个item的height是32  
    // (currentLyricsIndex - 3) * 32 目的是让当前歌词滚动到居中时 顶部（scrollTop）的位置
    // 300 是间隔时间
    scrollTo(panelRef.current, (currentLyricsIndex - 3) * 32, 300)
  }, [currentLyricsIndex])

  return (
    <PanelWrapper ref={ panelRef }>
      <div className='lrc-content'>
        {
          currentLyrics && currentLyrics.map((item, index) => (
            <div 
              className={ classnames('lrc-item', { active : currentLyricsIndex === index }) } 
              key={ index }>
              { item.content }
            </div>
          ))
        }
      </div>
    </PanelWrapper>
  )
})
