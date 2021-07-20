import * as actionTypes from './constants'
import {
  PLAY_SEQUENCE,
  DATA_PREFIX,
  STORE_PLAY_LIST,
} from '../utils/constants'
import {
  getSongDetail,
  getLyric,
  getSimiPlaylist,
  getSimiSongs,
} from '@/apis/player'
import {
  randomNumber,
} from '@/utils/random'
import {
  setStorage,
  getStorage,
} from '@/utils/storage'
import {
  parseLyric
} from '@/utils/lyric-parse'

function changeCurrentSongAction(data) {
  return {
    type: actionTypes.CHANGE_CURRENT_SONG,
    song: data
  }
}

function changeCurrentSongIndexAction(data) {
  return {
    type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
    currentSongIndex: data
  }
}

function changeCurrentLyricAction(data) {
  return {
    type: actionTypes.CHANGE_CURRENT_LYRIC,
    currentLyrics: data
  }
}

function changeSimiPlaylistAction(data) {
  return {
    type: actionTypes.CHANGE_SIMI_PLAYLIST,
    simiPlaylist: data
  }
}

function changeSimiSongsAction(data) {
  return {
    type: actionTypes.CHANGE_SIMI_SONGS,
    simiSongs: data
  }
}

export function changePlayListAction(data) {
  setStorage(STORE_PLAY_LIST, data)
  return {
    type: actionTypes.CHANGE_PLAY_LIST,
    playList: data
  }
}

function getLyricAction(id) {
  return dispatch => {
    // 获取当前歌曲歌词
    getLyric({
      id
    }).then(res => {
      dispatch(changeCurrentLyricAction(parseLyric(res.lrc.lyric)))
    })
  }
}

export function changePlaySequenceAction(sequence) {
  switch (sequence) {
    case PLAY_SEQUENCE.ORDER:
      sequence = PLAY_SEQUENCE.RANDOM
      break
    case PLAY_SEQUENCE.RANDOM:
      sequence = PLAY_SEQUENCE.LOOP
      break
    default:
      sequence = PLAY_SEQUENCE.ORDER
      break
  }
  return {
    type: actionTypes.CHANGE_PLAY_SEQUENCE,
    playSequence: sequence
  }
}

export function changePlayerPanelAction(operator) {
  return {
    type: actionTypes.CHANGE_PLAYER_PANEL,
    showPlayerPanel: operator
  }
}

export function changePlaySongAction(flag) {
  // 播放上一首 / 下一首 flag: 1 / -1
  return (dispatch, getState) => {
    const state = getState().get(DATA_PREFIX)
    const currentSongIndex = state.get('currentSongIndex')
    const playSequence = state.get('playSequence')
    const playList = state.get('playList')
    const listLen = playList.length

    if (listLen < 2) {
      // 0 的状态下什么都没有播放 
      // 1 的状态下random 会进入死循环 原来的歌曲index song都没有改变也不会触发hooks
      return
    }

    let currentIndex = currentSongIndex + flag
    // 通过播放模式来计算 上/下一首 播放什么 [TODO: 上一首按照历史来 如果没有历史则通过模式来进行计算]
    if (playSequence === PLAY_SEQUENCE.RANDOM) {
      do {
        currentIndex = randomNumber(listLen - 1)
      } while (currentIndex === currentSongIndex)
    } else { //  PLAY_SEQUENCE.ORDER /  PLAY_SEQUENCE.LOOP
      // 判断是否是特殊位置 第一首的上一首 / 最后一首的下一首
      if (currentIndex === listLen) {
        currentIndex = 0
      } else if (currentIndex < 0) {
        currentIndex = listLen - 1
      }
    }
    // 切换歌曲
    dispatch(changeCurrentSongIndexAction(currentIndex))
    dispatch(changeCurrentSongAction(playList[currentIndex]))
  }
}

export function changeCurrentLyricIndexAction(data) {
  return {
    type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
    currentLyricsIndex: data
  }
}

export function getSongDetailAction(params) {
  return (dispatch, getState) => {
    // 当用户点击播放时 先检测是否队列中已存在当前点击歌曲
    // 如果未存在则添加到播放队列最后的位置并播放
    // 如果存在则跳到相应的index位置并播放
    const ids = params.ids
    const playList = getState().getIn([DATA_PREFIX, 'playList'])
    
    const songIndex = playList.findIndex(item => (item.id === ids))
    if (songIndex !== -1) {
      dispatch(changeCurrentSongIndexAction(songIndex))
      dispatch(changeCurrentSongAction(playList[songIndex]))
    } else {
      getSongDetail(params).then(res => {
        const song = res.songs[0]
        dispatch(changePlayListAction([...playList, song]))
        dispatch(changeCurrentSongIndexAction(playList.length))
        dispatch(changeCurrentSongAction(song))
      })
    }
    dispatch(getLyricAction(ids))
  }
}

export function getStoragePlayListAction() {
  return (dispatch, getState) => {
    const playList = getState().getIn([DATA_PREFIX, 'playList'])
    const storeList = getStorage(STORE_PLAY_LIST)
    if (storeList && storeList.length > 0 && playList.length === 0) {
      dispatch(changePlayListAction(storeList))
      dispatch(changeCurrentSongIndexAction(0))
      dispatch(changeCurrentSongAction(storeList[0]))
      dispatch(getLyricAction(storeList[0].id))
    }
  }
}

export function getSimiPlaylistAction(params) {
  return dispatch => {
    // getSimiSongs
    getSimiPlaylist(params).then(res => {
      dispatch(changeSimiPlaylistAction(res.playlists || []))
    })
  }
}

export function getSimiSongsAction(params) {
  return dispatch => {
    getSimiSongs(params).then(res => {
      dispatch(changeSimiSongsAction(res.songs || []))
    })
  }
}