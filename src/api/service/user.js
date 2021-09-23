// 引入接口
// import api from './instance.js'
// import api from '../../common/requers.js'
import api from '@/common/luch-request.js'

// 用户登录
export const loginWithPhone = (params) => api.get({
	url: `/login/cellphone`,
	params,
	withCredentials: true
})

// 获取歌单分类
export const getPlaylistCatlist = () => api.get(`/playlist/catlist`, {})

