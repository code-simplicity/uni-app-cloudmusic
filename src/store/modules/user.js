// 用户

// state
const state = () => ({
	//登录状态
	loginState: null,

	// 用户信息
	userInfo: null,
})

// getters
const getters = {
	// 获取用户登录状态
	loginState: (state) => {
		// 获取登录状态
		let loginState = uni.getStorageSync('loginState');
		return state.loginState || loginState
		// return state.loginState
	},

	// 获取用户信息
	userInfo: (state) => {
		// 获取用户信息
		let userInfo = uni.getStorageSync('userInfo');
		return state.userInfo || userInfo
		// return state.userInfo
	}
}

// actions
const actions = {

}

// mutations
const mutations = {
	// 响应登录状态，做同步操作
	LOGIN_STATE(state, loginState) {
		state.loginState = loginState
	},

	// 用户信息
	USER_INFO(state, userInfo) {
		state.userInfo = userInfo
	},

	LOGIN(state, res) {
		state.loginState = true
		state.userInfo = res
		uni.setStorage({
			key: 'userInfo',
			data: res
		})
		console.log(state.loginState)
		console.log(state.userInfo)
	}
}

// 统一暴露
export default {
	// 开启命名空间
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
