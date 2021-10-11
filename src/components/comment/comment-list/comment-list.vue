<template>
	<view class="comment-list">
		<view
			class="comment-content-bot"
			v-for="(item, index) in commentList"
			:key="index"
			v-if="commentList.length > 0"
		>
			<view class="comment-content-hot-top">
				<view class="comment-left">
					<view class="avatar" @click="toUserInfo(item.user.userId)">
						<u-avatar size="70" :src="item.user.avatarUrl"></u-avatar>
					</view>
					<view class="user-info">
						<view class="user-name" @click="toUserInfo(item.user.userId)">{{ item.user.nickname }}</view>
						<view class="comment-time">{{ utils.dateFormat(item.time, 'YYYY-MM-DD') }}</view>
					</view>
				</view>
				<view class="comment-right">
					<text class="text">{{ item.likedCount }}</text>
					<u-icon
						class="icon-like"
						size="40"
						custom-prefix="iconfont"
						name="iconfont icon-dianzan1"
						:class="item.liked ? 'active' : ''"
						@click="doCommentLike(item.commentId, item.liked)"
					></u-icon>
				</view>
			</view>
			<view class="comment-info">
				<view class="comment-info-txt">{{ item.content }}</view>
				<view class="comment-info-num">
					8条回复
					<u-icon name="arrow-right" color="#000080"></u-icon>
				</view>
			</view>
		</view>
		<view class="comment-no-content" v-else>暂无评论。。。</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-10 4:33:29 ?F10: PM?
 * description
 */

export default {
	name: 'comment-list',
	data() {
		return {
			type: 2
		};
	},
	props: {
		commentList: {
			type: Array
		}
	},
	component: {},
	mounted() {},
	methods: {
		// 去用户中心
		toUserInfo(id) {
			this.$Router.push({
				name: 'UserInfoDetail',
				params: {
					id
				}
			});
		},

		// 评论点赞
		doCommentLike(cid, liked) {
			this.$emit('doCommentLike', cid, liked);
		}
	}
};
</script>

<style lang="scss" scoped>
.comment-list {
	width: 100%;
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
						font-size: 32rpx;
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
				.icon-like {
					&.active {
						color: #ff0000;
					}
				}
			}
		}
		.comment-info {
			margin-top: 20rpx;
			margin-left: 90rpx;
			border-bottom: 1px solid #bdbdbd;
			.comment-info-txt {
				font-size: 28rpx;
			}
			.comment-info-num {
				margin-top: 6rpx;
				color: #000080;
				font-size: 24rpx;
				margin-bottom: 20rpx;
			}
		}
	}
}
</style>
