import api from '../../common/luch-request.js'

/**
 * 获取每日推荐歌单
 */
export const getRecommendResource = () => api.get(`/recommend/resource`, {})
