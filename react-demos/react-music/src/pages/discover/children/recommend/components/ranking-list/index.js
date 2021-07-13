import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
  formatImgSize,
} from '@/utils/format'

import {
  RankingListWrapper
} from './style'

const RMRankingList = memo(function RMRankingList(props) {
  const { info } = props
  const tracks = info.tracks || []

  return (
    <RankingListWrapper>
      <div className='header'>
        <div className='image'>
          <img src={ formatImgSize(info.coverImgUrl, 80) } alt='' />
          <a href='/todo' className='image_cover'>ranking</a>
        </div>
        <div className='info'>
          <a href='/todo'>{ info.name }</a>
          <div>
            <button className='btn play sprite_02'></button>
            <button className='btn favor sprite_02'></button>
          </div>
        </div>
      </div>
      <div className='list'>
        {
          tracks.slice(0, 10).map((item, index) => (
            <div key={item.id} className='list-item'>
              <div className='rank'>{index + 1}</div>
              <div className='info'>
                <span className='name text-nowrap'>{ item.name }</span>
                <div className='operate'>
                  <button className='btn sprite_02 play'></button>
                  <button className='btn sprite_icon2 addto'></button>
                  <button className='btn sprite_02 favor'></button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='footer'>
        <a href='/todo'>查看全部 &gt;</a>
      </div>
    </RankingListWrapper>
  )
})

RMRankingList.propTypes = {
  info: PropTypes.object.isRequired
}

export default RMRankingList
