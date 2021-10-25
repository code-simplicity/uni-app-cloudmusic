<template>
	<view class="user-notify">
		<u-navbar back-text="通知" title=""></u-navbar>
		<view class="wrap" v-if="notifyList && notifyList.length > 0">
			<u-cell-group :border="false">
				<u-cell-item class="u-cell" :arrow="false" v-for="(item, index) of notifyList" :key="index">
					<view slot="icon" class="icon" @click="toUserInfo(item.notice.user.userId)">
						<u-avatar size="70" :src="item.notice.user.avatarUrl"></u-avatar>
					</view>
					<view slot="title" class="title">
						<view class="nickname">
							{{ item.notice.user.nickname }}
							<text class="text">赞了你的{{ item.notice.track ? '动态' : '评论' }}：</text>
						</view>
						<view class="last-msg" v-if="item.notice.track">{{ item.notice.track.json.msg }}</view>
						<view class="last-msg" v-if="item.notice.comment && item.notice.comment.beRepliedUser">
							回复
							<text class="at-name">@{{ item.notice.comment.beRepliedUser.nickname }}:</text>
							<text>{{ item.notice.comment.content }}</text>
						</view>
						<view class="last-msg" v-if="item.notice.comment && !item.notice.comment.beRepliedUser">
							{{ item.notice.comment.content }}
						</view>
					</view>
					<view slot="right-icon" class="right-icon">{{ utils.dateFormat(item.time, 'MM/DD') }}</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="no-notify" v-else>还没有评论哦</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-24 8:25:12 ?F10: PM?
 * description   用户通知
 */

export default {
	name: 'user-notify',
	data() {
		return {
			// 通知消息
			notifyList: [
				{
					notice: {
						track: {
							json: {}
						},
						comment: {
							beRepliedUser: {},
							content: ''
						},
						user: {
							nickname: ''
						}
					}
				}
			],
			// 返回数据
			limit: 30
		};
	},
	computed: {
		commentText() {
			return this.notifyList.forEach((item, index) => {
				return !item.notice.comment ? '评论' : '动态';
			});
		}
	},

	component: {},
	mounted() {
		this.getMsgNotices();
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

		// 获取通知
		getMsgNotices() {
			this.$api.getMsgNotices(this.limit).then(res => {
				if (res.code === this.$code.code_status) {
					this.notifyList = res.notices;
					this.notifyList.map((item, index) => {
						this.notifyList[index].notice = JSON.parse(item.notice);
						if (this.notifyList[index].notice.track) {
							this.notifyList[index].notice.track.json = JSON.parse(
								this.notifyList[index].notice.track.json
							);
						}
					});
					console.log('this.notifyList', this.notifyList);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user-notify {
	width: 100%;
	.wrap {
		width: 100%;
		.u-cell {
			padding: 8rpx 30rpx;
			.icon {
			}
			.title {
				margin-left: 20rpx;
				.nickname {
					color: #0000f8;
					font-size: 28rpx;
					-webkit-line-clamp: 1;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					overflow: hidden;
					.text {
						color: #a6a6a6;
						font-size: 22rpx;
						margin-left: 16rpx;
					}
				}
				.last-msg {
					font-size: 24rpx;
					-webkit-line-clamp: 1;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					overflow: hidden;
					.at-name {
						color: #0000f8;
					}
				}
			}
			.right-icon {
				width: 100rpx;
				align-items: center;
				font-size: 22rpx;
			}
		}
	}
	.no-notify {
		text-align: center;
		margin-top: 40rpx;
	}
}
</style>
