import request from '@/services/request'

export const getTopBanners = () => {
  return request.get('/banner')
}

export const getHotRecommends = (params = {}) => {
  return request.get('/personalized', {
    params
  })
}

export const getNewAlbum = (params = {}) => {
  return request.get('/top/album', {
    params
  })
}

export const getRankingList = (params = {}) => {
  return request.get('/top/list', {
    params
  })
}