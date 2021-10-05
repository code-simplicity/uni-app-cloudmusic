s
<template>
	<view class="user-setting">
		<u-navbar back-text="返回" title="更多" :background="background">
			<view class="slot-wrap"><u-icon class="scan-tools" name="scan" color="#000000" size="50"></u-icon></view>
		</u-navbar>
		<view class="user-setting-wrap">
			<view class="image-avatar flex-between">
				<u-avatar :src="userInfo.avatarUrl" mode="square" size="70"></u-avatar>
				<view class="user-name">{{ userInfo.nickname }}</view>
				<u-button size="mini" shape="circle">签到 ></u-button>
			</view>

			<view class="user-grid">
				<u-grid :col="4" :border="false">
					<u-grid-item :key="index" v-for="(item, index) in userGridData">
						<view class="m-icon">
							<u-badge
								v-if="item.useBadge"
								class="icon-index"
								size="mini"
								type="error"
								:count="item.count"
							></u-badge>
							<u-icon size="48" :name="item.icon"></u-icon>
						</view>
						<view class="m-text">{{ item.text }}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>

		<view class="user-product">
			<u-cell-group :border="false">
				<u-cell-item :border-bottom="false" icon="shopping-cart" title="商城" :arrow="true"></u-cell-item>
				<u-cell-item
					:border-bottom="false"
					icon="google-circle-fill"
					title="游戏专区"
					:arrow="true"
				></u-cell-item>
				<u-cell-item :border-bottom="false" icon="map" title="附近的人" :arrow="true"></u-cell-item>
				<u-cell-item :border-bottom="false" icon="bell" title="口袋彩铃" :arrow="true"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="user-more">
			<u-cell-group :border="true" style="padding: 16rpx 0;">
				<u-cell-item :border-bottom="false" icon="setting" title="设置" :arrow="true"></u-cell-item>
				<u-cell-item :border-bottom="false" icon="play-circle" title="听歌识曲" :arrow="true"></u-cell-item>
				<u-cell-item :border-bottom="false" icon="eye" title="夜间模式" :arrow="false">
					<u-switch v-model="checked" active-color="#111111" inactive-color="#eee" size="38"></u-switch>
				</u-cell-item>
				<u-cell-item :border-bottom="false" icon="close-circle" title="定时关闭" :arrow="true"></u-cell-item>
				<u-cell-item :border-bottom="false" icon="clock" title="音乐闹钟" :arrow="true"></u-cell-item>
				<u-cell-item :border-bottom="false" icon="integral" title="音乐云盘" :arrow="true"></u-cell-item>
				<u-cell-item :border-bottom="false" icon="heart" title="青少年模式" :arrow="true"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="user-more">
			<u-cell-group :border="true" style="padding: 0 0 16rpx 0;">
				<u-cell-item :border-bottom="false" icon="order" title="我的订单" :arrow="true"></u-cell-item>
				<u-cell-item
					:border-bottom="false"
					icon="server-fill"
					title="在线听歌免流量"
					:arrow="true"
				></u-cell-item>
				<u-cell-item :border-bottom="false" icon="coupon" title="优惠券" :arrow="true"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="user-logout">
			<u-button type="error" :ripple="true" ripple-bg-color="#4086ff" shape="square">退出登录/关闭</u-button>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-5 10:16:39 ?F10: AM?
 * description
 */
import { mapGetters } from 'vuex';
export default {
	name: 'user-setting',
	data() {
		return {
			background: {
				backgroundImage: 'linear-gradient(45deg, rgb(187, 181, 182), rgb(198, 142, 143))'
			},
			userGridData: [
				{ text: '我的消息', icon: 'email', useBadge: true, count: 99 },
				{ text: '云贝中心', icon: 'account' },
				{ text: '个人主页', icon: 'home' },
				{ text: '创作者中心', icon: 'edit-pen' }
			],
			checked: false
		};
	},
	computed: {
		...mapGetters('user', ['userInfo', 'loginState'])
	},

	component: {},
	mounted() {},
	methods: {
		toBack() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user-setting {
	width: 100%;
	height: 100%;
	padding: 20rpx 20rpx 40rpx 20rpx;
	.slot-wrap {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex: 1;
		padding: 0 20rpx;
	}
	.user-setting-wrap {
		width: 100%;

		.image-avatar {
			width: 100%;
			padding: 20rpx;
			background-color: #ffffff;
			margin: 0 0 16rpx 0;
			.user-name {
				flex: 1;
				margin-left: 20rpx;
			}
		}
		.user-grid {
			width: 100%;
			margin-bottom: 16rpx;
		}
		.user-product {
			width: 100%;
		}

		.user-more {
			width: 100%;
		}
		.user-logout {
			width: 100%;
		}
	}
}
</style>
