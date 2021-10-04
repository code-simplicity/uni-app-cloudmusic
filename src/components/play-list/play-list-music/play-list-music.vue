<template>
	<view class="play-list-music">
		<view class="play-list-header">
			<view class="play-list-play-left">
				<view class="play-list-left-circle">
					<u-icon name="play-circle-fill" color="#ff0000" size="50"></u-icon>
				</view>
				<view class="play-list-left-all">播放全部</view>
			</view>
			<view class="play-list-play-right">
				<view class="play-list-right-download">
					<u-icon name="download" color="#7b777c" size="40"></u-icon>
				</view>
				<view class="play-list-right-checkmark">
					<u-icon name="checkmark-circle" color="#7b777c" size="40"></u-icon>
				</view>
			</view>
		</view>
		<view
			class="play-list-content"
			v-for="(item, index) in songs"
			:key="index"
			:class="index === currentIndex && currentSong.id === item.id && playing ? 'playing' : ''"
		>
			<view class="play-list-left">
				<view class="play-list-index">
					<view class="index">{{ utils.formatZero(index + 1, 2) }}</view>
					<u-icon
						custom-prefix="iconfont"
						class="play-btn"
						name="iconfont icon-bofang1"
						color="#be0c00"
						size="56"
						@click="playMusci(item, index)"
					></u-icon>
					<u-icon
						custom-prefix="iconfont"
						class="pause-btn"
						name="iconfont icon-zanting1"
						color="#be0c00"
						size="56"
						@click="pauseSong"
					></u-icon>
				</view>
				<view class="play-list-images" @click="playMusci(item, index)">
					<image class="image-cover image-border" :src="item.image" mode="aspectFit"></image>
				</view>
				<view class="play-list-info" @click="playMusci(item, index)">
					<view class="play-list-title">
						<text class="title">{{ utils.strslice(item.name) }}</text>
					</view>
					<view class="play-list-name">
						<text class="title">{{ item.singer }}</text>
					</view>
				</view>
			</view>
			<view class="play-list-right">
				<view class="play-list-video">
					<u-icon
						class="video-tools"
						name="iconfont icon-MV"
						custom-prefix="iconfont"
						color="#7b777c"
						size="40"
					></u-icon>
				</view>
				<view class="play-list-tools">
					<u-icon class="list-tools" name="more-dot-fill" color="#7b777c" size="40"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-2 8:17:57 ?F10: PM?
 * description
 */
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	name: 'play-list-music',
	data() {
		return {};
	},
	props: {
		songs: {
			type: Array
		}
	},

	computed: {
		...mapGetters('player', ['currentIndex', 'currentSong', 'playing'])
	},

	component: {},
	mounted() {},
	methods: {
		// 播放音乐
		playMusci(item, index) {
			this.$Router.push({
				name: 'Player',
				params: {
					newSong: this.songs,
					index: index
				}
			});
		},

		// 暂停
		pauseSong() {
			this.pausePlay();
			this.$audio_player.pause()
		},

		...mapActions('player', ['selectPlay', 'pausePlay', 'playAll']),

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
.play-list-music {
	width: 100%;
	padding: 20rpx;
	.play-list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		margin-bottom: 20rpx;
		.play-list-play-left {
			display: flex;
			align-items: center;
			.play-list-left-circle {
				margin-right: 40rpx;
			}
			.play-list-left-all {
				font-size: 36rpx;
			}
		}
		.play-list-play-right {
			display: flex;
			.play-list-right-checkmark {
				margin-left: 30rpx;
			}
		}
	}
	.play-list-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		margin-bottom: 20rpx;
		height: 90rpx;
		.play-list-left {
			display: flex;
			align-items: center;
			.play-list-index {
				margin-right: 50rpx;
				.index {
					font-size: 32rpx;
					margin-left: 18rpx;
					text-align: center;
				}
				.play-btn {
					cursor: pointer;
					position: relative;
					display: none;
					text-align: center;
				}
				.pause-btn {
					cursor: pointer;
					position: relative;
					display: none;
					text-align: center;
				}
			}
			.play-list-images {
				width: 90rpx;
				height: 90rpx;
				margin-right: 16rpx;
				.image-cover {
					width: 90rpx;
					height: 90rpx;
				}
			}
			.play-list-info {
				display: flex;
				flex-direction: column;
				width: 100%;
				.play-list-title {
					font-size: 30rpx;
					margin-bottom: 10rpx;
					.title {
						flex-wrap: nowrap;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
				.play-list-name {
					font-size: 22rpx;
					.title {
						flex-wrap: nowrap;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
			}
		}
		&.playing {
			.play-list-index {
				.index {
					display: none;
				}
				.pause-btn {
					display: block;
				}
				.play-btn {
					display: none;
				}
			}
		}
		&:hover {
			.play-list-index {
				.index {
					display: none;
				}
				.pause-btn {
					display: none;
				}
				.play-btn {
					display: block;
				}
			}
			&.playing {
				.play-list-index {
					.index {
						display: none;
					}
					.pause-btn {
						display: block;
					}
					.play-btn {
						display: none;
					}
				}
			}
		}
		.play-list-right {
			display: flex;
			align-items: center;
			.play-list-video {
			}
			.play-list-tools {
				margin-left: 30rpx;
				.list-tools {
					transform: rotate(90deg);
				}
			}
		}
	}
}
</style>
