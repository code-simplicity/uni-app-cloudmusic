<template>
	<view class="user-comment">
		<u-navbar back-text="评论" title=""></u-navbar>
		<view class="wrap" v-if="commentList && commentList.length > 0">
			<view class="comment-list" v-for="(item, index) in commentList" :key="index">
				<view class="left" @click="toUserInfo(item.user.userId)">
					<u-avatar :src="item.user.avatarUrl" size="70"></u-avatar>
				</view>
				<view class="right">
					<view class="title-top">
						<view class="nickname">{{ item.user.nickname }}</view>
						<view class="timer">{{ utils.dateFormat(item.time, 'MM/DD') }}</view>
					</view>
					<view class="title-reply">回复我：{{ item.content }}</view>
					<view class="title-comment">{{ item.beRepliedContent }}</view>
				</view>
			</view>
		</view>
		<view class="no-commnet" v-else>还没有评论哦</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-24 8:27:48 ?F10: PM?
 * description	用户评论
 */
import { mapGetters } from 'vuex';
export default {
	name: 'user-comment',
	data() {
		return {
			// 评论列表
			commentList: [],
			limit: 30
		};
	},
	computed: {
		...mapGetters('user', ['userInfo'])
	},

	component: {},
	mounted() {
		this.getMsgComments();
	},
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

		getMsgComments() {
			let params = {
				uid: this.userInfo.userId,
				limit: this.limit
			};
			this.$api.getMsgComments(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.commentList = res.comments;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user-comment {
	width: 100%;
	.wrap {
		width: 100%;
		padding: 20rpx 26rpx;
		.comment-list {
			width: 100%;
			display: flex;
			.left {
				margin-right: 20rpx;
			}
			.right {
				width: 100%;
				padding: 10rpx 10rpx 16rpx 10rpx;
				border-bottom: 1px solid #bfbfbf;
				.title-top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.nickname {
						color: #6756be;
						font-size: 30rpx;
					}
					.timer {
						font-size: 24rpx;
						color: #9d9d9d;
					}
				}
				.title-reply {
					font-size: 28rpx;
					margin: 16rpx 0;
				}
				.title-comment {
					background-color: #e2e2e2;
					padding: 2rpx 16rpx;
				}
			}
		}
	}
	.no-commnet {
		text-align: center;
		margin-top: 40rpx;
	}
}
</style>
