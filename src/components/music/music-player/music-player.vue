<template>
	<view class="music-player" v-show="playList.length > 0">
		<view class="music-player-box">
			<view class="music-play-wrap">
				<view class="cover"><image class="image-cover" :src="currentSong.image" mode="aspectFit"></image></view>
				<view class="music-name-info" @click="openMusciDetail(currentSong.id)">
					<text class="musci-name">{{ currentSong.name }}--</text>
					<text class="musci-singer">{{ currentSong.singer }}</text>
				</view>
			</view>
			<view class="music-button-list">
				<view class="music-button">
					<u-icon custom-prefix="iconfont" :name="playIcon" size="58" @click="togglePlaying"></u-icon>
				</view>
				<view class="music-list"><u-icon name="grid" size="46"></u-icon></view>
			</view>
		</view>
		<!-- <music-detail :showMusicDetail="showMusicDetail"></music-detail> -->
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-26 9:52:29 ?F10: AM?
 * description
 */
import { mapGetters, mapActions, mapMutations } from 'vuex';
// uni.createInnerAudioContext()播放音乐
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
export default {
	name: 'music-player',
	data() {
		return {
			// 歌曲正在播放
			songReady: false,
			// 是否展示播放详情
			showMusicDetail: false
		};
	},
	component: {},
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
		}
	},

	watch: {
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

	mounted() {},
	methods: {
		// 打开播放器页面
		openMusciDetail(id) {
			// uni.navigateTo({
			// 	// url:'components/music-detail/music-detail?id=' + id
			// 	url: '/pages/music-detail/music-detail?id=' + id
			// })
			this.$Router.push({
				name: 'MusicDetail',
				params: {
					id
				}
			});
		},

		// 播放/展厅
		togglePlaying() {
			if (!this.songReady) {
				return;
			}
			this.setPlayingState(!this.playing);
		},

		...mapMutations('player', {
			setPlayingState: 'PLAYING_STATE',
			setCurrentIndex: 'CURRENT_INDEX'
		}),

		...mapActions('player', ['selectPlay', 'pausePlay'])
	}
};
</script>

<style lang="scss" scoped>
.music-player {
	width: 100%;
	height: 80rpx;
	position: fixed;
	bottom: calc(var(--window-bottom));
	left: 0;
	right: 0;
	z-index: 9888;
	background-color: $uni-bg-color;
	padding: 10rpx 10rpx;
	line-height: 80rpx;
	.music-player-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.music-play-wrap {
			display: flex;
			justify-content: space-between;
			.cover {
				height: 60rpx;
				width: 60rpx;
				margin-left: 10rpx;
				line-height: 60rpx;
				.image-cover {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.music-name-info {
				margin-left: 20rpx;
				flex-wrap: nowrap;
				.musci-name {
					font-size: 32rpx;
					word-wrap: break-word;
					text-overflow: ellipsis;
				}
				.musci-singer {
					font-size: 26rpx;
					word-wrap: break-word;
					text-overflow: ellipsis;
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
}
</style>
