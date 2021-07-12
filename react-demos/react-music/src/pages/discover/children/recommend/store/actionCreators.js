import * as actionTypes from './constants'

import { 
  getTopBanners,
  getHotRecommends,
} from '@/apis/recommend'

const changeTopBannersAction = data => {
  return {
    type: actionTypes.CHANGE_TOP_BANNER,
    topBanners: data
  }
}

const changeHotRecomendAction = data => {
  return {
    type: actionTypes.CHANGE_TOP_BANNER,
    hotRecommends: data
  }
}

export const getTopBannersAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      dispatch(changeTopBannersAction(res.banners))
    })
  }
}

export const getHotRecommendsAction = () => {
  return dispatch => {
    getHotRecommends().then(res => {
      console.log(res)
      // dispatch(changeHotRecomendAction(res))
    })
  }
}