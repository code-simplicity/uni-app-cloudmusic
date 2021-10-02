import api from '@/common/luch-request.js'
// import api from '@/common/instance.js'

/**
 * 获取榜单
 */
export const getTopListDetail = () => api.get(`toplist/detail`, {})

/**
 * 获取榜单详情
 */
export const getPlayListDetail = params => api.get(`/playlist/detail`, {
	params
})
