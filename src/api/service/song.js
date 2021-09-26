import api from '../../common/luch-request.js'

/**
 * 新歌速度
 */
export const getTopSong = (type) => api.get(`/top/song?type=${type}`, {})

/**
 * 推荐新音乐
 */
export const getPersonalizedNewSong = (limit) => api.get(`/personalized/newsong?limit=${limit}`, {})

/**
 * 获取歌曲详情
 */
export const getSongDetail = (params) => api.get(`/song/detail`, {
    params
})

