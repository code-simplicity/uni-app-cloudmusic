// 引入缓存的工具
import {
	saveHistory
} from 'cache.js'

// 播放器实例，全局调用，避免污染
let player = {}

// 创建全局唯一的播放实例
function getPlayer() {
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	return innerAudioContext
}

// 播放器地址
player.setUrl() = function(url) {
	url = url || this.saveHistory().url
	let player = getPlayer()
	player.src = url
	return
}

// 播放前的准备

// 播放器播放
player.play = function() {
	let player = getPlayer()
	player.play(() => {
		console.log('音乐开始播放')
	}，(err) => {
		console.log(err)
	})
	return
}

// 播放暂停
player.pause = function() {
	let player = getPlayer()
	return player.pause()
}

// 获取播放时间
player.getDuration = function() {
	let player = getPlayer()
	return player.getDuration();
}

// 上一首
player.prev = function(song) {
	
}
