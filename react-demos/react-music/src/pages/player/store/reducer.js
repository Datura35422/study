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
  currentLyrics: [],
  currentLyricsIndex: 0,
  showPlayerPanel: true,
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
      return state.set('playSequence', action.playSequence)
    case actionTypes.CHANGE_CURRENT_LYRIC: 
      return state.set('currentLyrics', action.currentLyrics)
    case actionTypes.CHANGE_CURRENT_LYRIC_INDEX: 
      return state.set('currentLyricsIndex', action.currentLyricsIndex)
    case actionTypes.CHANGE_PLAYER_PANEL: 
      return state.set('showPlayerPanel', action.showPlayerPanel)
    default:
      return state
  }
}

export default reducer