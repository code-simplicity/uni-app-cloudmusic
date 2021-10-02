import api from '../../common/luch-request.js'
// import api from '@/common/instance.js'

/**
 * 获取每日推荐歌单
 */
export const getRecommendResource = () => api.get(`/recommend/resource`, {})

/**
 * 获取推荐歌单
 */
export const getPersonalized = (limit) => api.get(`personalized?limit=${limit}`, {})

/**
 * 获取用户创建的歌单
 */
export const getUserPlaylist = (uid) => api.get(`/user/playlist?uid=${uid}`, {})

/**
 * 获取歌单详情
 */
export const getPlaylistDetail = (id, s) => api.get(`/playlist/detail?id=${id}&s=${s}`, {})
