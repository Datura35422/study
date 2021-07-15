import * as actionTypes from './constants'

import { 
  getTopBanners,
  getHotRecommends,
  getNewAlbum,
  getRankingList,
} from '@/apis/recommend'

function changeTopBannersAction(data) {
  return {
    type: actionTypes.CHANGE_TOP_BANNER,
    topBanners: data
  }
}

function changeHotRecomendAction(data) {
  return {
    type: actionTypes.CHANGE_HOT_RECOMMEND,
    hotRecommends: data
  }
}

function changeNewAlbumsAction(data) {
  return {
    type: actionTypes.CHANGE_NEW_ALBUMS,
    newAlbums: data
  }
}

function changeRankingListAction(data, type) {
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

export function getTopBannersAction() {
  return dispatch => {
    getTopBanners().then(res => {
      dispatch(changeTopBannersAction(res.banners))
    })
  }
}

export function getHotRecommendsAction(params) {
  return dispatch => {
    getHotRecommends(params).then(res => {
      dispatch(changeHotRecomendAction(res.result))
    })
  }
}

export function getNewAlbumsAction(params) {
  return dispatch => {
    getNewAlbum(params).then(res => {
      dispatch(changeNewAlbumsAction(res.albums))
    })
  }
}

export function getRankingListAction(params, type) {
  return dispatch => {
    getRankingList(params).then(res => {
      dispatch(changeRankingListAction(res.playlist, type))
    })
  }
}