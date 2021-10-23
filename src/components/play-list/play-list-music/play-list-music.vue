<template>
	<view class="play-list-music">
		<u-sticky v-if="songs && songs.length > 0">
			<view class="play-list-header">
				<view class="play-list-play-left">
					<view class="play-list-left-circle" @click="playAll">
						<u-icon name="play-circle-fill" color="#ff0000" size="50"></u-icon>
					</view>
					<view class="play-list-left-all">
						播放全部
						<text>({{ songs.length }})</text>
					</view>
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
		</u-sticky>
		<scroll-view
			scroll-y
			style="width: 100%; height: 100%;"
			@scrolltolower="onreachBottom"
			v-if="songs && songs.length > 0"
		>
			<u-cell-group :border="false" class="search-cell-group">
				<u-cell-item
					:arrow="false"
					v-for="(item, index) in songs"
					:key="index"
					@click="playMusci(item, index)"
					class="u-cell"
					:class="index === currentIndex && currentSong.id === item.id && playing ? 'playing' : ''"
				>
					<view slot="icon" class="slot-icon">
						<view class="index">{{ utils.formatZero(index + 1, 2) }}</view>
						<image class="image-cover image-border" :src="item.image" mode="aspectFit"></image>
						<u-icon
							class="play-btn"
							custom-prefix="iconfont"
							name="iconfont icon-bofang1"
							size="62"
							color="#ffffff"
							@click="playMusci(item, index)"
						></u-icon>
						<u-icon
							class="pause-btn"
							custom-prefix="iconfont"
							name="iconfont icon-zanting1"
							size="62"
							color="#ffffff"
							@click="pauseMusci"
						></u-icon>
					</view>
					<view slot="title" class="slot-title">
						<view class="singer-name">{{ item.name }}</view>
						<view class="singer-num">
							<text>{{ item.singer }}</text>
						</view>
					</view>
					<view slot="right-icon" class="slot-right">
						<u-icon
							v-if="item.mv"
							class="video"
							custom-prefix="iconfont"
							name="iconfont icon-shipin"
							size="40"
						></u-icon>
						<u-icon class="tools" name="more-dot-fill" size="40"></u-icon>
					</view>
				</u-cell-item>
			</u-cell-group>
		</scroll-view>
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
		// scroll-view到底部加载更多
		onreachBottom() {
			console.log('没有更多了!');
		},

		// 播放全部音乐
		playAll() {
			this.playAll();
		},

		// 播放音乐
		playMusci(item, index) {
			this.selectPlay({
				list: this.songs,
				index
			});
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
	.play-list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 20rpx;
		line-height: 60rpx;
		padding: 10rpx 0;
		background-color: #ffffff;
		.play-list-play-left {
			display: flex;
			align-items: center;
			.play-list-left-circle {
				margin-right: 40rpx;
			}
			.play-list-left-all {
				font-size: 32rpx;
				text {
					margin-left: 16rpx;
					font-size: 20rpx;
					text-align: center;
				}
			}
		}
		.play-list-play-right {
			display: flex;
			.play-list-right-checkmark {
				margin-left: 30rpx;
			}
		}
	}
	.search-cell-group {
		width: auto;
		padding: 10rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		.u-cell {
			padding: 10rpx;
			.slot-icon {
				display: flex;
				align-items: center;
				.index {
					font-size: 26rpx;
					margin: 0 19rpx;
					text-align: center;
				}

				.image-cover {
					width: 90rpx;
					height: 90rpx;
					margin: 0 20rpx;
				}
				.play-btn {
					margin: 20rpx 110rpx;
					cursor: pointer;
					position: absolute;
					align-items: center;
				}
				.pause-btn {
					margin: 10rpx 110rpx;
					display: none;
					cursor: pointer;
					position: absolute;
					text-align: center;
				}
			}
			&.playing {
				.slot-icon {
					.play-btn {
						display: none;
					}
					.pause-btn {
						display: block;
					}
				}
			}
			.slot-title {
				.singer-name {
					font-size: 26rpx;
					-webkit-line-clamp: 1;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.singer-num {
					font-size: 20rpx;
					-webkit-line-clamp: 1;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
			.slot-right {
				.tools {
					transform: rotate(90deg);
				}
			}
		}
	}
}
</style>
