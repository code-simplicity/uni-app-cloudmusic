<template>
	<view class="comment-box">
		<!-- 头部 -->
		<view class="">
			<u-navbar back-text="返回" title="评论">
				<view slot="right">
					<u-icon
						class="right-icon"
						name="iconfont icon-fenxiang"
						custom-prefix="iconfont"
						size="40"
					></u-icon>
				</view>
			</u-navbar>
		</view>
		<!-- 内容区 -->
		<view class="comment-content">
			<view class="comment-content-header">
				<view class="comment-content-left">评论区</view>
				<view class="comment-content-right">
					<view class="title">推荐</view>
					<view class="title">最热</view>
					<view class="title">最新</view>
				</view>
			</view>
			<view class="comment-content-bot">
				<view class="comment-content-hot-top">
					<view class="comment-left">
						<view class="avatar"><u-avatar size="80" :src="src"></u-avatar></view>
						<view class="user-info">
							<view class="user-name">xxx</view>
							<view class="comment-time">2021年</view>
						</view>
					</view>
					<view class="comment-right">
						<text class="text">123</text>
						<u-icon size="40" name="photo"></u-icon>
					</view>
				</view>
				<view class="comment-info">
					<view class="comment-info-txt">xxxxxxxxxxxxxxx</view>
					<view class="comment-info-num">8</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-8 7:12:40 ?F10: PM?
 * description 评论
 */

export default {
	name: 'Comment',
	data() {
		return {};
	},
	component: {},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.comment-box {
	width: 100%;
	height: 100%;
	.right-icon {
		margin-right: 30rpx;
	}
	.comment-content {
		width: 100%;
		padding: 20rpx;
		.comment-content-header {
			display: flex;
			justify-content: space-between;
			text-align: center;
			.comment-content-left {
				font-size: 30rpx;
			}
			.comment-content-right {
				display: flex;
				justify-content: space-between;
				text-align: center;
				.title {
					margin-left: 20rpx;
				}
			}
		}
		.comment-content-bot {
			width: 100%;
			margin-top: 20rpx;
			.comment-content-hot-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.comment-left {
					display: flex;
					.avatar {
						margin-right: 20rpx;
					}
					.user-info {
						.user-name {
							font-size: 38rpx;
							margin-bottom: 10rpx;
						}
						.comment-time {
							font-size: 10rpx;
						}
					}
				}
				.comment-right {
					.text {
						font-size: 26rpx;
						margin-right: 20rpx;
					}
				}
			}
			.comment-info {
				margin-top: 20rpx;
				margin-left: 100rpx;
				.comment-info-txt {
					font-size: 30rpx;
				}
				.comment-info-num {
				}
			}
		}
	}
}
</style>
