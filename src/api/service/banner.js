// 轮播图
import api from '../../common/luch-request.js'
// import api from '@/common/instance.js'

/**
 * 获取轮播图
 * type:资源类型,对应以下类型,默认为 0 即PC
 */
export const getBanner = (type) => api.get(`/banner?type=${type}`, {})
