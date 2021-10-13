// 处理视频
import utils from './utils.js'

export default class Video {
	/**
	 * id,         视频id
		nickName,  用户名
		name,		歌手名
		playCount,	播放量
		duration,	时长
		image,		图片
		isLive,		是否直播
		avatar,		用户头像
		praisedCount	点赞次数
	 */
	constructor({
		id,
		nickName,
		name,
		playCount,
		duration,
		image,
		isLive,
		avatar,
		praisedCount
	}) {
		(this.id = id),
		(this.nickName = nickName),
		(this.name = name),
		(this.playCount = playCount),
		(this.duration = duration),
		(this.image = image),
		(this.isLive = isLive),
		(this.avatar = avatar),
		(this.praisedCount = praisedCount)
	}
}

export function createVideo(data) {
	if (data.duration > 0) {
		data.duration = utils.formatTime(data.duration)
	}
	return new Video({
		id: data.id,
		nickName: data.nickName,
		name: data.name,
		playCount: data.playCount,
		duration: data.duration,
		image: data.image,
		isLive: data.isLive,
		avatar: data.avatar,
		praisedCount: data.praisedCount
	})
}
