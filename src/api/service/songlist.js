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

/**
 * 热门歌单分类
 */
export const getPlayListHot = () => api.get(`/playlist/hot`, {})

/**
 * 收藏歌单/取消收藏歌单
 */
export const playlistSubscribe = params => api.get(`/playlist/subscribe`, {
	params
})

/**
 * 创建歌单
 */
export const createPlayList = params => api.get(`/playlist/create`, {
	params
})

/**
 * 删除歌单
 */
export const deletePlayList = id => api.get(`/playlist/delete?id=${id}`, {})

/**
 * 对歌单添加或删除歌曲
 * op: 从歌单增加单曲为 add, 删除为 del
 * pid: 歌单 id tracks
 * 歌曲 id,可多个,用逗号隔开
 */
export const addPlaylistTracks = params => api.get(`/playlist/tracks`, {
	params
})
