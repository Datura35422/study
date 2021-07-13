import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getNewAlbumsAction } from '../../store/actionCreators'
import {
  DATA_PREFIX,
  NEW_ALBUM_LIMIT
} from '../../utils/constants'

import { Carousel } from 'antd'
import RMThemeHeaderRecommend from '@/components/theme-header/recommend'
import RMAlbumCover from '@/components/album-cover'
import {
  NewAlbumWrapper
} from './style'

export default memo(function RMNewAlbum() {
  const { newAlbums } = useSelector(state => ({
    newAlbums: state.getIn([DATA_PREFIX, 'newAlbums'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNewAlbumsAction({
      limit: NEW_ALBUM_LIMIT
    }))
  }, [dispatch])

  const carouselRef = useRef()

  return (
    <NewAlbumWrapper>
      <RMThemeHeaderRecommend title='新碟上架' />
      <div className='content'>
        <div className='inner'>
          <Carousel dots={ false } ref={ carouselRef }>
            {
              [0, 1].map(page => (
                <div className='page' key={ page }>
                  {
                    newAlbums.slice(page * 5, (page + 1) * 5).map(item => (
                      <RMAlbumCover 
                        key={ item.id } 
                        info={ item } 
                        size={ {width: 118, height: 100} }
                        bgp={ -570 }/>
                    ))
                  }
                </div>
              ))
            }
          </Carousel>
        </div>
        <div className='sprite_02 arrow arrow-left' onClick={() => carouselRef.current.prev()}></div>
        <div className='sprite_02 arrow arrow-right' onClick={() => carouselRef.current.next()}></div>
      </div>
    </NewAlbumWrapper>
  )
})
