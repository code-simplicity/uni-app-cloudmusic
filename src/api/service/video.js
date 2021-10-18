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

/**
 * 获取视频详情
 */
export const getVideoDetail = id => api.get(`/video/detail?id=${id}`, {})

/**
 * 获取相关视频
 */
export const getRelatedAllvideo = id => api.get(`/related/allvideo?id=${id}`, {})

/**
 * 获取视频点赞转发评论数据
 */
export const getVideoDetailInfo = vid => api.get(`/video/detail/info?vid=${vid}`, {})
