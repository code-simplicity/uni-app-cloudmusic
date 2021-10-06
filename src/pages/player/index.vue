<template>
	<view class="musci-player-detail">
		<view class="bg-wrapper">
			<image class="image-bg" style="width: 100%;height: 100%;" :src="currentSong.image" mode="aspectFit"></image>
		</view>
		<view class="musci-player-box">
			<view class="musci-header">
				<view class="left">
					<u-icon
						name="iconfont icon-zhankai"
						size="48"
						custom-prefix="iconfont"
						@click="colseDetail"
					></u-icon>
				</view>
				<view class="center">
					<text>{{ currentSong.name }}</text>
				</view>
				<view class="right">
					<u-icon size="48" name="iconfont icon-fenxiang" custom-prefix="iconfont"></u-icon>
				</view>
			</view>
			<view class="musci-content">
				<view class="musci-content-cover" @click="openLyric('image')" v-if="showLyric">
					<view class=""></view>
					<image
						class="image-cover  animate__animated animate__bounceIn"
						:class="playing ? '' : 'stoped'"
						:src="currentSong.image"
						mode="aspectFit"
					></image>
				</view>
				<view class="musci-content-lyric" @click="openLyric('lyric')" v-else>
					<lyric ref="lyricRef" :currentLyric="currentLyric" :currentLyricNum="currentLyricNum"></lyric>
				</view>
			</view>
			<view class="musci-tools">
				<view class="musci-like">
					<u-icon size="52" name="iconfont icon-shoucang" custom-prefix="iconfont"></u-icon>
				</view>
				<view class="musci-like">
					<u-icon size="54" name="iconfont icon-xiazai" custom-prefix="iconfont"></u-icon>
				</view>
				<view class="musci-like">
					<u-icon size="54" name="iconfont icon-pinglun" custom-prefix="iconfont"></u-icon>
				</view>
				<view class="musci-like">
					<u-icon size="54" name="iconfont icon-sandian" custom-prefix="iconfont"></u-icon>
				</view>
			</view>
			<view class="musci-tools-progress">
				<view class="musci-tools-timel">
					<text>{{ formatTime(currentTime) }}</text>
				</view>
				<view class="musci-tools-progress">
					<slider
						class="musci-slider"
						activeColor="#FFCC33"
						backgroundColor="#000000"
						block-color="#8A6DE9"
						block-size="8"
						:value="progressBar"
						@change="sliderChange"
						@changing="sliderChanging"
					/>
				</view>
				<view class="musci-tools-timer">
					<text>{{ formatTime(currentSong.duration) }}</text>
				</view>
			</view>
			<view class="music-play-btn">
				<view class="music-play-btn-list">
					<u-icon size="54" :name="playModeIcon" custom-prefix="iconfont" @click="changeMode"></u-icon>
				</view>
				<view class="music-play-btn-list">
					<u-icon
						size="54"
						name="iconfont icon-shangyiqu1"
						custom-prefix="iconfont"
						@click="prevSong"
					></u-icon>
				</view>
				<view class="music-play-btn-list">
					<u-icon size="90" :name="playIcon" custom-prefix="iconfont" @click="togglePlaying"></u-icon>
				</view>
				<view class="music-play-btn-list">
					<u-icon size="54" name="iconfont icon-xiayiqu" custom-prefix="iconfont" @click="nextSong"></u-icon>
				</view>
				<view class="music-play-btn-list">
					<u-icon size="46" name="iconfont icon-bofangliebiao" custom-prefix="iconfont"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-28 8:07:39 ?F10: AM?
 * description
 */
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import { playMode } from '@/utils/playmode.js';
import Lyric from 'lyric-parser';
export default {
	name: 'music-detail',
	data() {
		return {
			// 歌曲正在播放
			songReady: false,
			// 是否展示播放详情
			showMusicDetail: false,
			// 歌曲初始化时间
			currentTime: 0,
			// 音乐进度条
			progressBar: 0,
			// 进度条状态
			progressState: false,
			// 歌曲是否正在播放
			// 打开歌词
			showLyric: true,
			// 是否是有歌词的音乐
			isPureMusic: false,
			// 当前歌词
			currentLyric: null,
			// 歌词文本
			currentLyricTxt: '',
			// 正在播放的歌词
			playingLyric: '',
			// 歌词行数
			currentLyricNum: 0,
			// 是否能通过歌词播放
			canLyricPlay: false
		};
	},

	computed: {
		...mapGetters('player', [
			'playList',
			'playing',
			'currentSong',
			'currentIndex',
			'mode',
			'sequenceList',
			'historyList'
		]),
		playIcon() {
			return this.playing ? 'iconfont icon-zanting' : 'iconfont icon-bofang';
		},

		playModeIcon() {
			return this.mode === playMode.sequence
				? 'iconfont icon-shunxubofang'
				: this.mode === playMode.loop
				? 'iconfont icon-24gl-repeatOnce2'
				: 'iconfont icon-suiji';
		}
	},

	watch: {
		// 观察歌曲的变化，做出响应
		currentSong(newVal, oldVal) {
			if (!newVal.id || !newVal.url || newVal.id === oldVal.id) {
				return;
			}
			this.songReady = false;
			// 歌词处理
			this.isPureMusic = false;
			if (this.currentLyric) {
				this.currentLyric.stop();
				// 重置为null
				this.currentLyric = null;
				this.currentTime = 0;
				this.playingLyric = '';
				this.currentLyricNum = 0;
			}

			// 歌词id加载
			this.getLyric(newVal.id);
			this.$nextTick(function() {
				Vue.prototype.cusPlay = this.onPlay;
				Vue.prototype.cusTimeUpdate = this.onTimeUpdate;
				Vue.prototype.cusEnded = this.onEnded;
				Vue.prototype.cusOnCanplay = this.onCanplay;
				Vue.prototype.cusOnError = this.onError;
				Vue.prototype.cusOnPause = this.onPause;
				this.$audio_player.url = newVal.url;
				this.$audio_player.autoplay = true;
				this.$audio_player.src = newVal.url;
			});
			// 保存播放记录
			this.saveHistoryList(newVal);
			// 假若歌曲为播放，就认为超时，做超时处理
			this.timer = setTimeout(() => {
				this.songReady = true;
			}, 3000);
			clearTimeout(this.timer);
		},

		// 监听播放状态
		playing(isPlaying) {
			this.$nextTick(() => {
				if (this.$audio_player) {
					isPlaying ? this.$audio_player.play() : this.$audio_player.pause();
				}
			});
		}
	},

	created() {},

	component: {},

	mounted() {
		this.initPlay();
	},
	methods: {
		// 初始化播放
		initPlay() {
			let newSong = this.$Route.query.newSong;
			let index = this.$Route.query.index;
			this.selectPlay({
				list: newSong,
				index: index
			});
		},

		// 获取歌词
		async getLyric(id) {
			try {
				let res = await this.$api.getLyric(id);
				if (res.code === this.$code.code_status) {
					let lyric = res.lrc.lyric;
					this.currentLyric = new Lyric(lyric, this.lyricHandle);
					if (this.playing && this.canLyricPlay) {
						this.currentLyric.play(this.currentTime);
						this.currentLyricNum = 0;
						this.currentLyric.seek(this.currentTime * 1000);
					}
				}
			} catch (error) {
				this.currentLyric = null;
				this.playingLyric = '';
				this.currentLyricNum = 0;
				this.isPureMusic = true;
				console.log('获取歌词失败');
			}
		},

		lyricHandle({ lineNum, txt }) {
			this.currentLyricNum = lineNum;
			this.playingLyric = txt;
			if (lineNum > 1) {
				let line = this.$refs.lyricRef.$refs.lyricLine[lineNum - 5];
				if (this.$refs.lyricRef.$refs.lyricList) {
					this.$nextTick(() => {
						this.$refs.lyricRef.$refs.lyricList.scrollToElement(line, 1000);
					});
				}
			} else if (this.$refs.lyricRef.$refs.lyricList) {
				this.$nextTick(() => {
					this.$refs.lyricRef.$refs.lyricList.scrollTo(0, 0, 1000);
				});
			}
		},

		// 更新播放器时间
		onTimeUpdate() {
			this.$audio_player.onTimeUpdate(() => {
				if (!this.progressState) {
					this.currentTime = this.$audio_player.currentTime;
					this.progressBar = (this.$audio_player.currentTime / this.currentSong.duration) * 100;
				}
			});
		},

		// 打开歌词
		openLyric(val) {
			if (val === 'image') {
				this.showLyric = false;
			} else if (val === 'lyric') {
				this.showLyric = true;
			}
		},

		// 打开播放器页面
		openMusciDetail() {
			if (this.showMusicDetail) {
				this.showMusicDetail = false;
			} else {
				this.showMusicDetail = true;
			}
		},
		// 改变进度条
		sliderChange(val) {
			const currentTime = ((val.detail.value / 100) * this.currentSong.duration) / 1000;
			this.$audio_player.currentTime = currentTime * 1000;
			this.currentTime = currentTime * 1000;
			this.progressState = false;
			if (!this.playing) {
				this.togglePlaying();
			}
		},

		// 进度条移动
		sliderChanging(val) {
			this.progressState = true;
			const currentTime = (val.detail.value / 100) * this.currentSong.duration;
			this.currentTime = currentTime;
			this.progressBar = val.detail.value;
			if (!this.playing) {
				this.togglePlaying();
			}
			if (this.currentLyric) {
				this.currentLyric.seek(currentTime * 1000);
			}
		},

		// 播放准备完成
		onCanplay() {
			clearTimeout(this.timer);
			this.songReady = true;
			this.canLyricPlay = false;
			if (this.currentLyric && !this.isPureMusic) {
				this.currentLyric.seek(this.currentTime * 1000);
			}
		},

		// // 歌曲播放
		onPlay() {
			clearTimeout(this.timer);
			this.songReady = true;
			this.canLyricPlay = true;
		},

		// 歌曲暂停
		onPause() {
			this.setPlayingState(false);
			if (this.currentLyric && !this.isPureMusic) {
				this.currentLyric.seek(this.currentTime * 1000);
			}
		},

		// 单曲循环
		loopSong() {
			this.$audio_player.currentTime = 0;
			this.$audio_player.play();
			InnerAudioContext.loop = true;
			this.setPlayingState(true);
			if (this.currentLyric !== '') {
				this.currentLyric.seek(0);
			}
		},

		// 播放结束
		onEnded() {
			this.currentTime = 0;
			if (this.mode === playMode.loop) {
				// 循环播放
				this.loopSong();
			} else {
				this.nextSong();
			}
			console.log('ended');
		},

		onError() {
			this.$audio_player.currentTime = 0;
			this.setPlayingState(false);
		},

		// 关闭播放器
		colseDetail() {
			uni.navigateBack({
				delta: 1
			});
		},

		// 重置当前播放序号
		resetCurrentIndex(list) {
			let index = list.findIndex(item => {
				return item.id === this.currentSong.id;
			});
			this.setCurrentIndex(index);
		},

		// 切换播放模式
		changeMode() {
			let mode = (this.mode + 1) % 3;
			this.setPlayMode(mode);
			let list = null;
			if (mode === playMode.random) {
				list = this.utils.shuffle(this.sequenceList);
			} else {
				list = this.sequenceList;
			}
			this.resetCurrentIndex(list);
			this.setPlayList(list);
		},

		// 上一曲
		prevSong() {
			// 假如只有一首歌
			if (this.playList.length === 1) {
				循环播放;
				this.loopSong();
				return;
			} else {
				// 是一个专辑或者歌单
				let index = this.currentIndex - 1;
				if (index === -1) {
					index = this.playList.length - 1;
				}
				// 设置播放序号
				this.setCurrentIndex(index);
				if (!this.playing) {
					this.togglePlaying();
				}
			}
		},

		// 下一曲
		nextSong() {
			// 假如只有一首歌
			if (this.playList.length === 1) {
				循环播放;
				this.loopSong();
				return;
			} else {
				// 是一个专辑或者歌单
				let index = this.currentIndex + 1;
				if (index === this.playList.length) {
					index = 0;
				}
				// 设置播放序号
				this.setCurrentIndex(index);
				if (!this.playing) {
					this.togglePlaying();
				}
			}
		},

		// 播放/暂停
		togglePlaying() {
			this.setPlayingState(!this.playing);
			// 切换歌词播放状态
			if (this.currentLyric) {
				this.currentLyric.togglePlay();
			}
		},

		// 格式化时间
		formatTime(dataTime) {
			dataTime = dataTime | 0;
			const m = (dataTime / 60) | 0;
			const s = dataTime % 60;
			return `${this.utils.formatZero(m, 2)} : ${this.utils.formatZero(s, 2)}`;
		},

		// 响应状态
		...mapMutations('player', {
			setPlayingState: 'PLAYING_STATE',
			setCurrentIndex: 'CURRENT_INDEX',
			setPlayMode: 'PLAY_MODE',
			setPlayList: 'PLAY_LIST'
		}),
		...mapActions('player', {
			selectPlay: 'selectPlay',
			pausePlay: 'pausePlay',
			saveHistoryList: 'saveHistoryList',
			deleteHistoryList: 'deleteHistoryList',
			clearHistoryList: 'clearHistoryList'
		})
	}
};
</script>

<style lang="scss" scoped>
.musci-player-detail {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	z-index: 9999;
	.bg-wrapper {
		.image-bg {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			filter: blur(60px);
			opacity: 0.9;
		}
	}
	.musci-player-box {
		padding: 16rpx 26rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		width: 100%;
		.musci-header {
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.musci-content {
			flex: 11;
			.musci-content-cover {
				width: 400rpx;
				height: 500rpx;
				margin: 0 auto;
				.image-cover {
					position: fixed;
					top: 20%;
					width: 400rpx;
					height: 400rpx;
					border-radius: 50%;
					animation-duration: 6s;
					animation-delay: 6s;
					animation: loading 6s linear infinite;
					// &.playing {
					// 	animation-duration: 6s;
					// 	animation-delay: 6s;
					// 	animation: loading 6s linear infinite;
					// }
					&.stoped {
						animation-play-state: paused;
					}
				}
				@keyframes loading {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			}
			.musci-content-lyric {
				width: 100%;
				border-radius: 8rpx;
				font-size: 38rpx;
				color: #ffffff;
				margin-top: 30rpx;
				height: 100%;
				overflow: hidden;
				overflow-y: scroll;
				position: relative;
			}
		}
		.musci-tools {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx 10rpx;
			.musci-like {
				color: #000000;
			}
		}
		.musci-tools-progress {
			display: flex;
			justify-content: space-between;
			flex: 1;
			align-items: center;
			padding: 10rpx 10rpx;
			.musci-slider {
				width: 100%;
				align-items: center;
				margin: 0 10rpx;
			}
		}
		.music-play-btn {
			padding: 10rpx 10rpx;
			display: flex;
			flex: 1;
			justify-content: space-between;
			align-items: center;
			.music-play-btn-list {
				align-items: center;
			}
		}
	}
}
</style>
