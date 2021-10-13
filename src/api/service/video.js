import api from '@/common/luch-request.js'

/**
 * 获取推荐视频
 */
export const getVideoTimelineRecommend = params => api.get(`/video/timeline/recommend`, {
	params
})

/**
 * 获取视频播放地址
 */
export const getVideoUrl = (id) => api.get(`/video/url?id=${id}`, {})
