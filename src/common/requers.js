import store from '../store/index.js'

// 引入地址配置文件
import config from '../api/config.js'

// 定义接口对象
let api = {}
let isExisited = false
// 配置地址
const {
	api_base_url
} = config

// 超时时间
const timeout = 60 * 1000;
// 发起http请求
function httpRequest(settings, opts) {
	// 配置项
	const {
		loading,
		hasToken,
		toast,
		checkToken
	} = opts
	// 获取token
	const token = uni.getStorageSync('token')
	// 获取用户信息
	// const hasUserInfo = store.getters.hasUserInfo
	// 判断是否有token
	if (hasToken !== false) {
		settings.header['Token'] = token
	}
	let showLoading = loading !== false
	// 加载中状态
	if (showLoading) uni.showLoading({
		title: '加载中...',
		mask: true
	})
	// 返回一个promise实例
	return new Promise((resolve, reject) => {
		// 发送请求
		uni.request({
			...settings,
			// 成功请求数据
			
			// 请求数据失败
			// fail: (res) => {
			// 	console.log('请求失败', res)
			// 	if (showLoading) uni.hideLoading()
			// 	uni.showToast({
			// 		title: res.return_message || '请求失败,请重试！',
			// 		duration: 2000,
			// 		icon: 'none',
			// 	})
			// },
			success: (res) => {
				// 获取状态
				// const statusCode = res.statusCode
				// // 获取返回的数据
				// const data = res.data
				// console.log('接口返回的status', statusCode, data)
				// console.log('接口返回的data', statusCode, data)
				// console.log('接口返回的res', res)
				// // 判断是否在加载
				// if (showLoading) {
				// 	uni.hideLoading()
				// }
				// // 判断请求回来的状态码,如果返回的是200，那么请求成功，返回数据
				// if (statusCode === 200) {
				// 	return resolve(data)
				// } else if (statusCode === 301) {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '请先登录账户'
				// 	})
				// 	// 跳转到登录页面
				// 	// TODO:
				// } else {
				// 	// 请求错误
				// 	reject(data)
				// }
			},
		})
	})
}

// 展示请求错误
function showError(res) {
	const {
		return_code,
		return_message
	} = res
}

// 封装发送参数
function setParams(params) {
	let res = []
	// 遍历参数
	for (let item in params) {
		res.push(`${item} = ${params[item]}`)
	}
	// 配置api接口参数的匹配方式
	return '?' + res.join('&')
}

api.get = function(opts) {
	const {
		params,
		data,
		toast,
		hasToken,
		loading,
		checkToken
	} = opts
	if (params) opts.url = opts.url + setParams(params)

	let defaultOpts = {
		url: api_base_url + opts.url,
		data: data,
		method: 'GET',
		header: {
			'X-Requested-With': 'XMLHttpRequest',
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=UTF-8',
		},
		dataType: 'json',
	}
	return httpRequest(defaultOpts, {
		loading,
		toast,
		hasToken,
		checkToken
	})
}

api.post = function(opts) {
	const {
		params,
		data,
		toast,
		hasToken,
		loading
	} = opts
	if (params) opts.url = opts.url + setParams(params)
	let defaultOpts = {
		url: api_base_url + opts.url,
		data: data,
		method: 'POST',
		header: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8',
		},
		dataType: 'json',
	}
	return httpRequest(defaultOpts, {
		loading,
		toast,
		hasToken
	})
}

// 请求方式的封装
// let requestMethod = ['get', 'post']

// // 循环遍历该方法
// requestMethod.forEach(method => {
// 	api[method] = function(opts) {
// 		const {
// 			params,
// 			data,
// 			toast,
// 			hasToken,
// 			loading,
// 			checkToken
// 		} = opts
// 		if (params) {
// 			opts.url = opts.url + setParams(params)
// 		}
// 		// 封装参数返回
// 		let defaultOpts = {
// 			url: api_base_url + opts.url,
// 			data: data,
// 			method: 'GET',
// 			header: {
// 				'X-Requested-With': 'XMLHttpRequest',
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json; charset=UTF-8',
// 			},
// 			dataType: 'json',
// 			timeout: timeout,
// 		}
// 		return httpRequest(defaultOpts, {
// 			loading,
// 			toast,
// 			hasToken,
// 			checkToken
// 		})
// 	}
// })

// 暴露api
export default api
