import { Map } from 'immutable'
import * as actionTypes from './constants'

const defaultState = Map({
  topBanners: [],
  hotRecommends: [],
  newAlbums: [],
  upRanking: {},
  newRanking: {},
  originRanking: {},
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNER:
      return state.set('topBanners', action.topBanners)
    case actionTypes.CHANGE_HOT_RECOMMEND:
      return state.set('hotRecommends', action.hotRecommends)
    case actionTypes.CHANGE_NEW_ALBUMS:
      return state.set('newAlbums', action.newAlbums)
    case actionTypes.CHANGE_UP_RANKING:
      return state.set('upRanking', action.rankingList)
    case actionTypes.CHANGE_NEW_RANKING:
      return state.set('newRanking', action.rankingList)
    case actionTypes.CHANGE_ORIGIN_RANKING:
      return state.set('originRanking', action.rankingList)
    default:
      return state
  }
}

export default reducer