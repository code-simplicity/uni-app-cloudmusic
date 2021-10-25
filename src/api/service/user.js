// 引入接口
import api from '@/common/luch-request.js'
// import api from '@/common/instance.js'

/**
 * 手机登录接口
 * @param {*} params phone 手机号码
 * @param {*} params md5_password md5加密密码
 * @returns
 */
export const loginWithPhone = params => api.get(`/login/cellphone`, {
	params,
	withCredentials: true
})

/**
 * 获取用户信息
 * @param {*} uid 用户id
 */
export const getUserInfo = (uid) => api.get(`/user/detail?uid=${uid}`, {})

/**
 * 获取喜欢的音乐
 */
export const getLikeList = (uid) => api.get(`/likelist?uid=${uid}`, {})

/**
 * 获取用户登录状态
 */
export const getLoginStatus = () => api.get(`/login/status`, {})

/**
 * 退出登录
 */
export const logout = () => api.get(`/logout`, {})

/**
 * 获取用户关注列表
 */
export const getUserFollows = params => api.get(`/user/follows`, {
	params
})

/**
 * 获取动态信息
 */
export const getEvent = pagesize => api.get(`/event?pagesize=${pagesize}`, {})

/**
 * 签到
 */
export const getDailySignin = () => api.get(`/daily_signin`, {})

/**
 * 获取私信
 */
export const getMsgPrivate = () => api.get(`/msg/private`, {})

/**
 * 获取通知
 */
export const getMsgNotices = (limit) => api.get(`/msg/notices?limit=${limit}`, {})

/**
 * at我
 */
export const getMsgForwards = (limit) => api.get(`/msg/forwards?limit=${limit}`, {})

/**
 * 评论通知
 */
export const getMsgComments = params => api.get(`/msg/comments`, {
	params
})

/**
 * 用户粉丝列表
 */
export const getUserFolloweds = params => api.get(`/user/followeds`, {
	params
})
