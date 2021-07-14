import request from '@/services/request'

export const getSongDetail = (params = {}) => {
  return request.get(`/song/detail`, {
    params
  })
}
