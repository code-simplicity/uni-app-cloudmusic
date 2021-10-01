// 引入luch-request
import Request from 'luch-request'
// 配置的接口访问地址
import config from '@/api/config.js'
// 引入http
const http = new Request();
// api接口暴露对象
const api = new Request();

// 引入config，配置请求地址，由本地变为生产
const {
	api_base_url
} = config

// 全局配置
http.setConfig((config) => {
	config.baseURL = api_base_url
	config.timeout = 60 * 1000
	// 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
	config.withCredentials = true
	config.dataType = 'json'
	config.header = {
		'Content-Type': 'multipart/form-data;application/json;charset=UTF-8;'
	}
	// config.header = {
	// 	'X-Requested-With': 'XMLHttpRequest',
	// 	Accept: 'application/json',
	// 	'Content-Type': 'application/json; charset=UTF-8',
	// }

	// #ifdef APP-PLUS || H5
	config.responseType = 'json'

	// #ifdef MP
	config.responseType = 'text'

	return config
})

// 请求拦截器
http.interceptors.request.use((config) => {
	config.header = {
		...config.header
	}
	if (config.method === 'POST') {
		config.data = JSON.stringify(config.data);
	}
	return config
}, (error) => {
	return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
	let data = response.data
	let status = response.statusCode
	if (status === 200) {
		return Promise.resolve(data)
	} else {
		return Promise.reject(response)
	}
}, error => {
	if (error.statusCode === 301) {
		uni.showToast({
			title: '需要登录',
			icon: 'error'
		})
		uni.clearStorageSync();
		uni.switchTab({
			url: '/pages/login/index'
		})
	}
	return Promise.reject(error)
})

// 请求方式的组合
let requestMethod = ['get', 'post']
// 遍历请求方式
requestMethod.forEach(method => {
	api[method] = function(url, data, config) {
		return new Promise(function(resolve, reject) {
			http.get(url, data, config).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	}
})
// 暴露
export default api
