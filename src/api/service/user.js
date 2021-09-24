// 引入接口
import api from '@/common/luch-request.js'

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
