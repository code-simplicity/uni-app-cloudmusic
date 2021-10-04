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
		<view class="play-list-content" v-for="(item, index) in songs">
			<view class="play-list-left">
				<view class="play-list-index">{{ utils.formatZero(index + 1, 2) }}</view>
				<view class="play-list-info">
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

	component: {},
	mounted() {},
	methods: {}
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
		height: 80rpx;
		.play-list-left {
			display: flex;
			align-items: center;
			.play-list-index {
				margin-right: 40rpx;
				font-size: 30rpx;
				margin-left: 20rpx;
				text-align: center;
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
