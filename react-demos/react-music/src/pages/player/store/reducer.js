import { Map } from 'immutable'
import * as actionTypes from './constants'
import {
  PLAY_SEQUENCE,
} from '../utils/constants'

const defaultState = Map({
  currentSong: {},
  currentSongIndex: 0,
  playList: [],
  playSequence: PLAY_SEQUENCE.ORDER,
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG: 
      return state.set('currentSong', action.song)
    case actionTypes.CHANGE_CURRENT_SONG_INDEX: 
      return state.set('currentSongIndex', action.currentSongIndex)
    case actionTypes.CHANGE_PLAY_LIST: 
      return state.set('playList', action.playList)
    case actionTypes.CHANGE_PLAY_SEQUENCE: 
      console.log(action.playSequence)
      return state.set('playSequence', action.playSequence)
    default:
      return state
  }
}

export default reducer