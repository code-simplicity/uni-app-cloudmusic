// services文件api，统一出口

import * as user from './service/user.js'

// 统一暴露
export default {
	...user
}