<template>
	<view class="user-focus">
		<view class="focus-page" v-if="userFollows && userFollows.length > 0">
			<view class="title">按关注时间排序</view>
			<u-cell-group :border="false">
				<u-cell-item
					class="u-cell"
					:arrow="false"
					v-for="(item, index) in userFollows"
					:key="index"
					@click="toUserInfo(item.userId)"
				>
					<view class="icon" slot="icon"><u-avatar :src="item.avatarUrl" size="80"></u-avatar></view>
					<view class="title" slot="title">
						<view class="user-name box-line1">{{ item.nickname }}</view>
						<view class="user-info box-line1">{{ item.signature }}</view>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="no-focus" v-else>还没有人关注哦</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-25 7:09:44 ?F10: PM?
 * description
 */

export default {
	name: 'user-focus',
	data() {
		return {};
	},
	props: {
		userFollows: {
			type: Array
		}
	},

	component: {},
	mounted() {},
	methods: {
		// 去用户列表
		toUserInfo(id) {
			this.$Router.push({
				name: 'UserInfoDetail',
				params: {
					id
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user-focus {
	.focus-page {
		padding: 20rpx;
		.title {
			font-size: 28rpx;
			margin-bottom: 16rpx;
		}
		.u-cell {
			padding: 16rpx;
			.icon {
				margin-right: 16rpx;
			}
			.title {
				.user-name {
					font-size: 28rpx;
				}
				.user-info {
					font-size: 22rpx;
				}
			}
		}
	}
	.no-focus {
		text-align: center;
		margin-top: 40rpx;
	}
}
</style>
