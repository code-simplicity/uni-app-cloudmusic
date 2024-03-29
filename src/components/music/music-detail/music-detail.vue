<template>
	<view class="musci-player-detail" v-if="showMusicDetail">
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
				<view class="musci-content-cover">
					<image class="image-cover" :src="currentSong.image" mode="aspectFit"></image>
				</view>
				<view class="musci-content-lyric"><!-- 歌词 --></view>
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
import { mapActions, mapGetters, mapMutations } from 'vuex';

import { playMode } from '@/utils/playmode.js'

const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
export default {
	name: 'music-detail',
	data() {
		return {
			// 歌曲id
			id: '',
			// 歌曲详情
			// 歌曲初始化时间
			currentTime: 0,
			// 音乐进度条
			progressBar: 0,
			// 歌曲正在播放
			songReady: false,
			// 进度条状态
			progressState: false
		};
	},

	props: {
		showMusicDetail: {
			type: Boolean
		}
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
		},
	},

	component: {},

	watch: {
		$Route(newVal, oldVal) {
			let id = this.$Router.query.id;
			console.log('id', id);
		},

		// 观察歌曲的变化，做出响应
		currentSong(newVal, oldVal) {
			if (!newVal.id || !newVal.url || newVal.id === oldVal.id) {
				return;
			}
			this.songReady = false;

			this.$nextTick(function() {
				if (innerAudioContext) {
					this.songReady = true;
					innerAudioContext.src = newVal.url;
					innerAudioContext.onPlay(() => {
						console.log('开始播放');
					});
					innerAudioContext.onError(res => {
						console.log(res.errMsg);
						console.log(res.errCode);
					});
				}
			});
			// 假若歌曲为播放，就认为超时，做超时处理
			this.timer = setTimeout(() => {
				this.songReady = true;
			}, 3000);
			clearTimeout(this.timer);
		},

		// 监听播放状态
		playing(isPlaying) {
			if (!this.songReady) {
				return;
			}
			this.$nextTick(() => {
				if (innerAudioContext) {
					isPlaying ? innerAudioContext.play() : innerAudioContext.pause();
				}
			});
		}
	},

	mounted() {
		let id = this.$Route.query.id;
		this.id = id;
	},
	methods: {
		// 改变进度条
		sliderChange(val) {
			this.progressState = true;
			const currentTime = (val.detail.value / 100) * this.currentSong.duration;
			this.currentTime = currentTime;
			this.progressBar = val.detail.value;
		},

		// 进度条移动
		sliderChanging(val) {
			this.progressState = true;
			let currentTime = ((val.detail.value / 100) * this.currentSong.duration) / 1000;
			innerAudioContext.currentTime = currentTime * 1000;
			this.currentTime = currentTime * 1000;
			if (!this.playing) {
				this.togglePlaying();
			}
		},

		// 更新播放器时间
		onTimeUpdate() {
			innerAudioContext.onTimeUpdate(() => {
				if (!this.progressState) {
					this.currentTime = innerAudioContext.currentTime;
					this.progressBar = (innerAudioContext.currentTime / this.currentSong.duration) * 100;
				}
			});
		},

		// 播放准备完成
		onCanplay() {
			innerAudioContext.onCanplay(res => {});
		},

		// 单曲循环
		loopSong() {
			innerAudioContext.currentTime = 0;
			innerAudioContext.play();
			InnerAudioContext.loop = true;
			this.setPlayingState(true);
		},

		// 关闭播放器
		colseDetail() {
			if (this.showMusicDetail) {
				this.showMusicDetail = false;
			} else {
				this.showMusicDetail = true;
			}
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
			// if (!this.songReady) {
			// 	return
			// }
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
			// if (!this.songReady) {
			// 	return
			// }
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
			if (!this.songReady) {
				return;
			}
			this.setPlayingState(!this.playing);
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
		})
	}
};
</script>

<style lang="scss" scoped>
.musci-player-detail {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	z-index: 9999;
	.musci-player-box {
		padding: 10rpx 16rpx;
		background-color: #d7efee;
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
				}
			}
			.musci-content-lyric {
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
