<template>
	<view class="user-message">
		<u-navbar back-text="消息" title="">
			<view slot="right" class="right">
				<view class="read-all">全部读取</view>
				<u-icon class="search" name="search" color="#848484" size="50"></u-icon>
			</view>
		</u-navbar>
		<view class="wrap">
			<view class="user-grid">
				<u-grid :col="4" :border="false">
					<u-grid-item :key="index" v-for="(item, index) in userGridData" @click="toPage(item.text)">
						<view class="m-icon" :style="{ backgroundColor: item.backgroundColor }">
							<u-icon class="u-icon" size="60" :name="item.icon" color="#ffffff"></u-icon>
						</view>
						<view class="m-text">{{ item.text }}</view>
					</u-grid-item>
				</u-grid>
			</view>
			<!-- 私信对话 -->
			<view class="private-message">
				<view class="title">私信对话</view>
				<u-cell-group :border="false">
					<u-cell-item
						class="u-cell"
						:arrow="false"
						v-for="(item, index) in messageInfo"
						:key="index"
						@click="toUserMessageDetail(item.fromUser.userId, item.fromUser.nickname)"
					>
						<view slot="icon" class="icon">
							<u-avatar :src="item.fromUser.avatarUrl" size="70"></u-avatar>
						</view>
						<view slot="title" class="title">
							<view class="nickname">{{ item.fromUser.nickname }}</view>
							<view class="last-msg">{{ item.lastMsg.msg }}</view>
						</view>
						<view slot="right-icon" class="right-icon">
							{{ utils.dateFormat(item.lastMsgTime, 'MM/DD') }}
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-24 5:11:52 ?F10: PM?
 * description   用户消息
 */

export default {
	name: 'user-message',
	data() {
		return {
			userGridData: [
				{ text: '粉丝', icon: 'account-fill', backgroundColor: '#e1262a' },
				{ text: '评论', icon: 'chat-fill', backgroundColor: '#cec437' },
				{ text: '@我', icon: 'attach', backgroundColor: '#2f89e3' },
				{ text: '通知', icon: 'bell-fill', backgroundColor: '#7f63c1' }
			],
			// 私信对话
			messageInfo: [
				{
					lastMsg: {},
					fromUser: {}
				}
			]
		};
	},
	component: {},
	mounted() {
		let id = this.$Route.query.id;
		if (id) {
		}
		this.getMsgPrivate();
	},
	methods: {
		// 去私信页面
		toUserMessageDetail(uid, title) {
			this.$Router.push({
				name: 'UserMessageDetail',
				params: {
					uid,
					title
				}
			});
		},

		// 去各种页面
		toPage(text) {
			switch (text) {
				case '通知': {
					this.$Router.push({
						name: 'UserNotify'
					});
					break;
				}
				case '@我': {
					this.$Router.push({
						name: 'UserAt'
					});
					break;
				}
				case '评论': {
					this.$Router.push({
						name: 'UserComment'
					});
					break;
				}
				case '粉丝': {
					this.$Router.push({
						name: 'UserList',
						params: {
							index: 2
						}
					});
					break;
				}
			}
		},

		// 获取私信
		getMsgPrivate() {
			this.$api.getMsgPrivate().then(res => {
				if (res.code === this.$code.code_status) {
					this.messageInfo = res.msgs;
					let messageInfo = res.msgs;
					messageInfo.map((item, index) => {
						this.messageInfo[index].lastMsg = JSON.parse(item.lastMsg);
					});
					this.messageInfo = messageInfo;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user-message {
	width: 100%;
	padding-bottom: 20rpx;
	.right {
		margin-right: 20rpx;
		display: flex;
		align-items: center;
		.read-all {
			border: 1rpx solid #c7c7c7;
			border-radius: 16rpx;
			margin-right: 20rpx;
			padding: 10rpx 10rpx;
			font-size: 24rpx;
			&:active {
				background-color: #dcdcdc;
			}
		}
	}
	.wrap {
		width: 100%;
		.user-grid {
			width: 100%;
			margin-bottom: 16rpx;
			.m-icon {
				border-radius: 50%;
				width: 100rpx;
				height: 100rpx;
				position: relative;
				.u-icon {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 20%;
				}
			}
			.m-text {
				margin-top: 12rpx;
				font-size: 24rpx;
			}
		}
		.private-message {
			width: 100%;
			.title {
				padding: 16rpx 20rpx;
			}
			.u-cell {
				padding: 8rpx 20rpx;
				.icon {
				}
				.title {
					.nickname {
					}
					.last-msg {
						font-size: 24rpx;
						-webkit-line-clamp: 1;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
				.right-icon {
					width: 100rpx;
					align-items: center;
					font-size: 22rpx;
				}
			}
		}
	}
}
</style>
