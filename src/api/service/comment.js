// 评论
import api from '../../common/luch-request.js'

/**
 * 获取歌单评论
 */
export const getCommentPlayList = params => api.get(`/comment/playlist`, {
	params
})

/**
 * 评论点赞
 * 必选参数 : id : 资源 id, 如歌曲 id,mv id
 * cid : 评论 id
t : 是否点赞 ,1 为点赞 ,0 为取消点赞
type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
0: 歌曲
1: mv
2: 歌单
3: 专辑
4: 电台
5: 视频
6: 动态
 */
export const doCommentLike = params => api.get(`/comment/like`, {
	params
})
