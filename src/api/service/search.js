import api from '../../common/luch-request.js'

/**
 * 热搜列表(简略)
 */
export const getSearchHot = () => api.get(`/search/hot`, {})

/**
 * 热搜列表(详细)
 */
export const getSearchHotDetail = () => api.get(`/search/hot/detail`, {})

/**
 * 默认搜索关键词
 */
export const getSearchDefault = () => api.get(`/search/default`, {})

/**
 * 建议搜索
 */
export const getSearchSuggest = params => api.get(`/search/suggest`, {
	params
})
