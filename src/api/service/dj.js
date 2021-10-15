import api from '../../common/luch-request.js'

/**
 * 获取电台轮播图
 */
export const getDjBanner = () => api.get(`/dj/banner`, {})

/**
 * 电台推荐类型
 */
export const getDjCategoryRecommend = () => api.get(`/dj/category/recommend`, {})

/**
 * 获取电台详情
 */
export const getDjDetail = (rid) => api.get(`/dj/detail?rid=${rid}`, {})

/**
 * 获取电台节目
 * 说明 : 登录后调用此接口 , 传入rid, 可查看对应电台的电台节目以及对应的 id, 
 * 需要 注意的是这个接口返回的 mp3Url 已经无效 , 都为 null, 但是通过调用 /song/url 这 个接口 , 
 * 传入节目 id 仍然能获取到节目音频 , 如 /song/url?id=478446370 获取代 码时间的一个节目的音频
 * 必选参数 : rid: 电台 的 id
 * 可选参数 :
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * asc : 排序方式,默认为 false (新 => 老 ) 设置 true 可改为 老 => 新
 */
export const getDjProgram = params => api.get(`/dj/program`, {
	params
})
