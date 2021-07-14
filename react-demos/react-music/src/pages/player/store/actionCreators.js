import * as actionTypes from './constants'
import {
  getSongDetail,
} from '@/apis/player'

const changeCurrentSongAction = data => {
  return {
    type: actionTypes.CHANGE_CURRENT_SONG,
    song: data
  }
}

export const getSongDetailAction = params => {
  return dispatch => {
    getSongDetail(params).then(res => {
      dispatch(changeCurrentSongAction(res.songs[0]))
    })
  }
}