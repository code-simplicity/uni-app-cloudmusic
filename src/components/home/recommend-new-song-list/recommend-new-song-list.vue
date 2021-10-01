<template>
	<view class="recommend-new-song-list">
		<view class="board-new-content">
			<view
				class="board-new-warp"
				v-for="(item, index) in newSong"
				:key="item.id"
				:class="index === currentIndex && currentSong.id === item.id && playing ? 'playing' : ''"
			>
				<view class="board-new-image">
					<view class="board-new-cover">
						<image
							class="image-cover image-border"
							:src="item.image"
							mode="aspectFit"
							lazy-load="true"
						></image>
					</view>
					<u-icon
						class="play-btn"
						custom-prefix="iconfont"
						name="iconfont icon-bofang1"
						@click="playMusci(item, index)"
					></u-icon>
					<u-icon
						class="pause-btn"
						custom-prefix="iconfont"
						name="iconfont icon-zanting1"
						@click="pauseMusci"
					></u-icon>
				</view>
				<view class="board-new-info">
					<view class="song-name">{{ item.name }}</view>
					<view class="singer-name">{{ item.singer }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-1 4:06:04 ?F10: PM?
 * description
 */

import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'recommend-new-song-list',
	data() {
		return {};
	},

	props: {
		newSong: {
			type: Array
		}
	},

	computed: {
		...mapGetters('player', ['currentIndex', 'currentSong', 'playing'])
	},
	component: {},
	mounted() {},
	methods: {
		// 暂停
		pauseMusci() {
			this.pausePlay();
		},

		// 播放音乐
		playMusci(item, index) {
			this.selectPlay({
				list: this.newSong,
				index
			});
			// uni.navigateTo({
			// 	url: '/pages/player/index'
			// });
		},

		// 响应状态
		...mapActions('player', ['selectPlay', 'pausePlay', 'playAll'])
	}
};
</script>

<style lang="scss" scoped>
.recommend-new-song-list {
	width: 100%;
	height: 100%;
	.board-new-content {
		width: 100%;
		height: 100%;
		.board-new-warp {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: row;
			margin-bottom: 10rpx;
			.board-new-image {
				width: 100rpx;
				height: 100rpx;
				flex: 1;
				.board-new-cover {
					.image-cover {
						width: 100rpx;
						height: 100rpx;
						position: absolute;
					}
				}
			}
			.play-btn {
				cursor: pointer;
				position: relative;
				align-items: center;
				font-size: 64rpx;
				color: #ffffff;
			}
			.pause-btn {
				font-size: 64rpx;
				display: none;
				cursor: pointer;
				position: relative;
				text-align: center;
				color: #ffffff;
			}

			.board-new-info {
				flex: 6;
				display: flex;
				flex-wrap: nowrap;
				flex-direction: column;
				margin-left: 16rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				.song-name {
					font-size: 30rpx;
					margin-bottom: 10rpx;
				}
				.singer-name {
					font-size: 26rpx;
				}
			}
			&.playing {
				.board-new-image {
					.play-btn {
						display: none;
					}
					.pause-btn {
						display: none;
					}
				}
			}
			&:hover {
				.board-new-image {
					.pause-btn {
						display: none;
					}
				}
				&.playing {
					.board-new-image {
						.play-btn {
							display: none;
						}
						.play-icon {
							display: none;
						}
						.pause-btn {
							display: block;
						}
					}
				}
			}
		}
	}
}
</style>
