// services文件api，统一出口

import * as user from './service/user.js'
import * as banner from './service/banner.js'
import * as songlist from './service/songlist.js'
import * as song from './service/song.js'
import * as board from './service/board.js'
import * as search from './service/search.js'
import * as comment from './service/comment.js'
import * as video from './service/video.js'

// 统一暴露
export default {
	...user,
	...banner,
	...songlist,
	...song,
	...board,
	...search,
	...comment,
	...video,
}
