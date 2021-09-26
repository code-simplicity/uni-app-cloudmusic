// services文件api，统一出口

import * as user from './service/user.js'
import * as banner from './service/banner.js'
import * as songlist from './service/songlist.js'
import * as song from './service/song.js'

// 统一暴露
export default {
	...user,
	...banner,
	...songlist,
	...song,
}