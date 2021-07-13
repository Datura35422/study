import * as actionTypes from './constants'

import { 
  getTopBanners,
  getHotRecommends,
  getNewAlbum,
  getRankingList,
} from '@/apis/recommend'

const changeTopBannersAction = data => {
  return {
    type: actionTypes.CHANGE_TOP_BANNER,
    topBanners: data
  }
}

const changeHotRecomendAction = data => {
  return {
    type: actionTypes.CHANGE_HOT_RECOMMEND,
    hotRecommends: data
  }
}

const changeNewAlbumsAction = data => {
  return {
    type: actionTypes.CHANGE_NEW_ALBUMS,
    newAlbums: data
  }
}

const changeRankingListAction = (data, type) => {
  const actionType = {
    up: actionTypes.CHANGE_UP_RANKING,
    new: actionTypes.CHANGE_NEW_RANKING,
    origin: actionTypes.CHANGE_ORIGIN_RANKING,
  }
  return {
    type: actionType[type],
    rankingList: data
  }
}

export const getTopBannersAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      dispatch(changeTopBannersAction(res.banners))
    })
  }
}

export const getHotRecommendsAction = params => {
  return dispatch => {
    getHotRecommends(params).then(res => {
      dispatch(changeHotRecomendAction(res.result))
    })
  }
}

export const getNewAlbumsAction = params => {
  return dispatch => {
    getNewAlbum(params).then(res => {
      dispatch(changeNewAlbumsAction(res.albums))
    })
  }
}

export const getRankingListAction = (params, type) => {
  return dispatch => {
    getRankingList(params).then(res => {
      console.log(res)
      dispatch(changeRankingListAction(res.playlist, type))
    })
  }
}