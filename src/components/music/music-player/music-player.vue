s
<template>
	<view class="music-player" v-if="showPlayTabBar">
		<view class="music-player-box">
			<view class="music-play-wrap" @click="openMusciDetail('open')">
				<view class="cover"><image class="image-cover" :src="currentSong.image" mode="aspectFit"></image></view>
				<view class="music-name-info">
					<view class="musci-name">
						{{ currentSong.name }}--
						<text class="musci-singer">{{ currentSong.singer }}</text>
					</view>
				</view>
			</view>
			<view class="music-button-list">
				<view class="music-button">
					<u-icon custom-prefix="iconfont" :name="playIcon" size="58" @click="togglePlaying"></u-icon>
				</view>
				<view class="music-list" @click="openPopup"><u-icon name="grid" size="52"></u-icon></view>
			</view>
		</view>
		<view class="musci-player-detail" v-if="showMusicDetail" :style="{ background: '#878787' }">
			<image class="image-bg" style="width: 100%;height: 100%;" :src="currentSong.image"></image>

			<view class="musci-player-box">
				<view class="musci-header">
					<view class="left">
						<u-icon
							name="iconfont icon-zhankai"
							size="48"
							custom-prefix="iconfont"
							@click="openMusciDetail('close')"
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
					<view
						class="musci-content-cover"
						@click="openLyric"
						:style="{ display: showLyric ? 'none' : 'flex' }"
					>
						<image
							class="image-cover  animate__animated animate__bounceIn"
							:class="playing ? '' : 'stoped'"
							:src="currentSong.image"
							mode="aspectFit"
						></image>
					</view>

					<view
						class="musci-content-lyric"
						@click="openLyric"
						:style="{ display: !showLyric ? 'none' : 'block' }"
					>
						<lyric-scroll :currentLyric="currentLyric" ref="lyricList"></lyric-scroll>
					</view>
				</view>
				<view class="musci-tools">
					<view class="musci-like">
						<u-icon size="48" name="iconfont icon-shoucang" custom-prefix="iconfont"></u-icon>
					</view>
					<view class="musci-like">
						<u-icon size="54" name="iconfont icon-xiazai" custom-prefix="iconfont"></u-icon>
					</view>
					<view class="musci-like">
						<u-badge
							class="badge"
							:count="commentTotal"
							:offset="[-10, -30]"
							bgColor="#000000"
							:is-center="true"
							:overflow-count="1000000000"
						></u-badge>
						<u-icon
							size="54"
							name="iconfont icon-pinglun"
							custom-prefix="iconfont"
							@click="toComment(currentSong.id)"
						></u-icon>
					</view>
					<view class="musci-like">
						<u-icon size="54" name="iconfont icon-sandian" custom-prefix="iconfont"></u-icon>
					</view>
				</view>
				<view class="musci-tools-progress">
					<view class="musci-tools-timer">{{ formatTime(currentTime) }}</view>
					<view class="musci-tools-progress">
						<slider
							class="musci-slider"
							activeColor="#ff0000"
							backgroundColor="#ffffff"
							block-color="#ff0000"
							block-size="8"
							:value="progressBar"
							@change="sliderChange"
							@changing="sliderChanging"
						/>
					</view>
					<view class="musci-tools-timer">{{ formatTime(currentSong.duration) }}</view>
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
						<u-icon
							size="54"
							name="iconfont icon-xiayiqu"
							custom-prefix="iconfont"
							@click="nextSong"
						></u-icon>
					</view>
					<view class="music-play-btn-list">
						<u-icon
							size="46"
							name="iconfont icon-bofangliebiao"
							custom-prefix="iconfont"
							@click="openPopup"
						></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 播放历史 -->
		<u-popup v-model="showPopup" mode="bottom" border-radius="16" width="100%" height="60%">
			<view class="popup-box">
				<view class="header">
					<view class="header-title">历史记录</view>
					<view class="header-tools">
						<view class="tools-left">列表循环</view>
						<view class="tools-right">
							<view class="tools-right-collect">
								<u-icon name="checkmark-circle" size="46" label="收藏全部"></u-icon>
							</view>
							<view class="tools-right-del">
								<u-icon name="trash" size="46" @click="clearHistory"></u-icon>
							</view>
						</view>
					</view>
				</view>
				<view class="scroll-box">
					<u-cell-group class="search-cell-group">
						<scroll-view style="height: 600rpx" scroll-y="true">
							<u-cell-item
								class="u-cell"
								:arrow="false"
								v-for="(item, index) of historyList"
								:key="item.id"
								:class="currentSong.id === item.id && playing ? 'playing' : ''"
								@click="playSong(index)"
							>
								<view slot="icon" class="slot-icon">
									<view class="">{{ utils.formatZero(index + 1, 2) }}</view>
									<view class="image">
										<u-image
											width="100"
											height="100"
											border-radius="16"
											:src="item.image"
										></u-image>
									</view>
								</view>
								<view slot="title" class="singer-title">
									<view class="songs-name">{{ item.name }}</view>
									<view class="singer-name">{{ item.singer }}</view>
								</view>
								<view slot="right-icon">
									<u-icon name="close" @click="deleteSong(item, index)"></u-icon>
								</view>
							</u-cell-item>
						</scroll-view>
					</u-cell-group>
				</view>
			</view>
		</u-popup>
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
			// 是否能通过歌词播放
			canLyricPlay: false,
			// 打开播放历史记录
			showPopup: false,
			limit: 40,
			offset: 0,
			// 评论总数
			commentTotal: ''
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
			'historyList',
			'showPlayTabBar'
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
				this.getLyric(newVal.id);
			});

			this.getCommentMusic(newVal.id);
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

	mounted() {},
	methods: {
		// 去评论列表
		toComment(id) {
			this.$Router.push({
				name: 'Comment',
				params: {
					id: id,
					type: 1
				}
			});
		},

		// 获取歌曲评论
		getCommentMusic(id) {
			let params = {
				id: id,
				limit: this.limit,
				offset: this.offset
			};
			this.$api.getCommentMusic(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.commentTotal = this.utils.tranNumber(res.total);
				}
			});
		},
		// 删除历史播放记录
		deleteSong(item) {
			this.deleteHistoryList(item);
		},

		// 清除全部播放历史
		clearHistory() {
			this.clearHistoryList();
		},

		// 播放音乐
		playSong(index) {
			this.selectPlay({
				list: this.historyList,
				index
			});
		},
		// 打开历史
		openPopup() {
			this.showPopup = !this.showPopup;
		},

		// 获取歌词
		async getLyric(id) {
			let res = await this.$api.getLyric(id);
			if (res.code === this.$code.code_status) {
				this.currentLyric = res.lrc.lyric;
				console.log('this.currentLyric', this.currentLyric);
			}
		},

		// 更新播放器时间
		onTimeUpdate() {
			if (!this.progressState) {
				this.currentTime = this.$audio_player.currentTime;
				this.progressBar = (this.$audio_player.currentTime / this.currentSong.duration) * 100;
				// 传递时间个歌词组件
				this.$refs.lyricList.update(this.$audio_player.currentTime);
			}
		},

		// 打开歌词
		openLyric() {
			this.showLyric = !this.showLyric;
		},

		// 打开播放器页面
		openMusciDetail(type) {
			if (type === 'open') {
				this.showMusicDetail = true;
				uni.hideTabBar();
			} else if (type === 'close') {
				this.showMusicDetail = false;
				uni.showTabBar();
			}
		},

		// 改变进度条
		sliderChange(val) {
			let currentTime = ((val.detail.value / 100) * this.currentSong.duration) / 1000;
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
			let currentTime = (val.detail.value / 100) * this.currentSong.duration;
			this.currentTime = currentTime;
			this.progressBar = val.detail.value;
			if (!this.playing) {
				this.togglePlaying();
			}
		},

		// 播放准备完成
		onCanplay() {
			clearTimeout(this.timer);
			this.songReady = true;
			this.canLyricPlay = false;
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
		},

		// 单曲循环
		loopSong() {
			this.$audio_player.currentTime = 0;
			this.$audio_player.play();
			InnerAudioContext.loop = true;
			this.setPlayingState(true);
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
			setPlayList: 'PLAY_LIST',
			setPlayTabBar: 'SHOW_PLAY_TBABAR'
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
.music-player {
	width: 100%;
	position: fixed;
	bottom: calc(var(--window-bottom));
	left: 0;
	right: 0;
	z-index: 9888;
	background-color: #ffffff;
	padding: 10rpx 10rpx;
	.popup-box {
		width: 100%;
		height: 100%;
		.header {
			width: 100%;
			position: fixed;
			padding: 20rpx 25rpx;
			display: flex;
			flex-direction: column;
			z-index: 6;
			top: 0;
			background-color: #ffffff;
			.header-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 36rpx;
				margin-bottom: 20rpx;
			}
			.header-tools {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.tools-left {
					font-size: 28rpx;
				}
				.tools-right {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.tools-right-collect {
						margin-right: 40rpx;
					}
				}
			}
		}
		.scroll-box {
			width: 100%;
			margin-top: 140rpx;
			.search-cell-group {
				.u-cell {
					&.playing {
						color: #ff0000;
					}
					.slot-icon {
						display: flex;
						align-items: center;
						margin-right: 30rpx;
						.image {
							margin-left: 16rpx;
						}
					}
					.singer-title {
						display: flex;
						flex-direction: column;
						.songs-name {
							font-size: 30rpx;
							-webkit-line-clamp: 1; // 用来限制在一个块元素显示的文本的行数
							display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
							-webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
							text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
							overflow: hidden;
						}
						.singer-name {
							font-size: 26rpx;
							display: flex;
							align-items: center;
						}
					}
				}
			}
		}
	}

	.music-player-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.music-play-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.cover {
				height: 70rpx;
				width: 70rpx;
				margin-left: 10rpx;
				.image-cover {
					height: 70rpx;
					width: 70rpx;
					border-radius: 50%;
				}
			}
			.music-name-info {
				display: flex;
				margin-left: 20rpx;
				align-items: center;

				.musci-name {
					font-size: 32rpx;
					.musci-singer {
						font-size: 24rpx;
					}
				}
			}
		}

		.music-button-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.music-button {
				margin-right: 20rpx;
			}
			.music-list {
			}
		}
	}
	.musci-player-detail {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 999;
		color: #ffffff;
		.image-bg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			filter: brightness(20%) opacity(1);
			background-size: cover;
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
					position: fixed;
					top: 120rpx;
					height: 100%;
					width: 100%;
					left: 0;
					right: 0;

					.lyric {
						width: 100%;
						height: 66%;
						.lyric-wrapper {
							width: 100%;
							height: 100%;
							overflow: hidden;
							overflow-y: scroll;
							.lyric-text {
								line-height: 60rpx;
								height: 60rpx;
								border-radius: 16rpx;
								font-size: 30rpx;
								font-weight: 500;
								text-align: center;
								color: #ffffff;
								&:hover {
									background-color: #f9fffc;
									color: #ffffff;
								}
								&.active {
									color: #e10003;
								}
								&::after {
									color: #ffffff;
								}
							}
						}
						.no-lyric {
							text-align: center;
							font-size: 36rpx;
							color: #ffffff;
						}
					}
				}
			}
			.musci-tools {
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10rpx 10rpx;
				.musci-like {
					position: relative;
					color: #ffffff;
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
				.musci-tools-timer {
					color: #ffffff;
					z-index: 1;
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
}
</style>
