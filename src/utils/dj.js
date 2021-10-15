// 对Dj进行格式化处理
import utils from "./utils.js"

export default class Dj {
	// 构造歌曲的参数以及返回参数的形式，这样做的目的其实是为了点击专辑详情之后就可以直接格式化数据，返回正常的数据
	/**
	 *  id, ==>歌曲id
	    name, ==> 曲目名
	    duration, ==>播放时长
	    album,==>专辑
	    image,==>图片
	    url,==>播放地址
	    playCount,==>播放次数
	    albumId,==>专辑id
		likedCount， ==> 点赞次数
		commentCount ==> 评论次数
		createTime ==> 创建时间
	 * @param {*} param0 
	 */
	constructor({
		id,
		name,
		duration,
		album,
		image,
		url,
		playCount,
		albumId,
		likedCount,
		commentCount,
		createTime
	}) {
		this.id = id
		this.name = name
		this.duration = duration
		this.album = album
		this.image = image
		this.url = url
		this.playCount = playCount
		this.albumId = albumId
		this.likedCount = likedCount
		this.commentCount = commentCount
		this.createTime = createTime
	}
}

// 统一暴露一个方法
export function createDj(djData) {
	// 返回一个新的实例对象
	return new Dj({
		id: djData.mainSong.id,
		name: djData.mainSong.name,
		duration: utils.formatSecond(djData.duration),
		album: djData.mainSong.album.name,
		image: djData.coverUrl,
		url: `https://music.163.com/song/media/outer/url?id=${djData.mainSong.id}.mp3`,
		playCount: djData.listenerCount || '',
		albumId: djData.mainSong.album.id,
		likedCount: djData.likedCount,
		commentCount: djData.commentCount,
		createTime: djData.createTime,

	})
}

// 歌手处理
function filterSinger(singer) {
	let arr = []
	if (!singer) {
		return ''
	}
	singer.map(item => {
		arr.push(item.name)
	})
	return arr.join(' / ')
}
