s
<template>
	<view class="user-setting">
		<u-navbar back-text="返回" title="更多">
			<view class="slot-wrap"><u-icon class="scan-tools" name="scan" color="#000000" size="50"></u-icon></view>
		</u-navbar>
		<view class="user-setting-wrap">
			<view class="image-avatar flex-between" v-if="loginState">
				<u-avatar
					:src="userInfo.avatarUrl"
					mode="circle"
					size="70"
					@click="toUserInfo(userInfo.userId)"
				></u-avatar>
				<view class="user-name" @click="toUserInfo(userInfo.userId)">{{ userInfo.nickname }}</view>
				<u-button size="mini" shape="circle" @click="getDailySignin">{{ siginText }} ></u-button>
			</view>
			<view class="user-no-login" v-else @click="toLogin">
				<view class="user-info-avatar"><u-avatar sex-icon="man" size="100" src="src"></u-avatar></view>
				<view class="user-login">
					立即登录
					<u-icon name="arrow-right" color="#2d2d2d" size="28"></u-icon>
				</view>
			</view>
			<view class="user-grid">
				<u-grid :col="4" :border="false">
					<u-grid-item :key="index" v-for="(item, index) in userGridData" @click="toPage(item.text)">
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
				<u-cell-item :border-bottom="false" icon="fingerprint" title="数据缓存" :arrow="true"></u-cell-item>
				<u-cell-item
					:border-bottom="false"
					icon="download"
					title="检查更新"
					:arrow="true"
					@click="doUpApp"
				></u-cell-item>
				<u-cell-item :border-bottom="false" icon="android-fill" title="关于" :arrow="true"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="user-logout">
			<u-popup v-model="showLogout" mode="bottom" border-radius="30" height="25%">
				<u-cell-group title="退出登录/关闭" :title-style="titleStyle">
					<u-cell-item :arrow="false" class="u-cell" title="退出登录" @click="logout"></u-cell-item>
					<u-cell-item :arrow="false" class="u-cell" title="关闭音乐" @click="killApp"></u-cell-item>
				</u-cell-group>
			</u-popup>
			<u-button type="error" :ripple="true" ripple-bg-color="#4086ff" shape="square" @click="toLogout">
				退出登录/关闭
			</u-button>
			<u-modal
				v-model="showLogoutModal"
				:show-cancel-button="true"
				:mask-close-able="true"
				:show-title="false"
				:zoom="true"
				content="确定要退出当前账户吗"
				@cancel="!showLogoutModal"
				@confirm="confirmLogout"
			></u-modal>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-5 10:16:39 ?F10: AM?
 * description
 */
import { mapGetters, mapMutations } from 'vuex';
import upApp from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
export default {
	name: 'user-setting',
	data() {
		return {
			userGridData: [
				{ text: '我的消息', icon: 'email', useBadge: true, count: 99 },
				{ text: '云贝中心', icon: 'account' },
				{ text: '个人主页', icon: 'home' },
				{ text: '创作者中心', icon: 'edit-pen' }
			],
			checked: false,
			// 展示底部关闭或者退出登录弹窗
			showLogout: false,
			titleStyle: {
				'font-size': '16rpx'
			},
			showLogoutModal: false,
			// 用户信息
			userDetailInfo: {}
		};
	},
	computed: {
		...mapGetters('user', ['userInfo', 'loginState']),
		siginText() {
			return this.userDetailInfo.mobileSign ? '已签到' : '签到';
		}
	},

	component: {},
	mounted() {
		this.getUserInfo();
	},
	methods: {
		// 去相关页面
		toPage(item) {
			switch (item) {
				case '我的消息': {
					this.$Router.push({
						name: 'UserMessage',
						params: {
							id: this.userInfo.userId
						}
					});
					break;
				}
				case '个人主页': {
					this.$Router.push({
						name: 'UserInfoDetail',
						params: {
							id: this.userInfo.userId
						}
					});
					break;
				}
			}
		},

		// 用户签到
		getDailySignin() {
			// 获取用户签到状态
			let title = this.userDetailInfo.mobileSign ? '签到成功' : '重复签到';
			this.$api.getDailySignin().then(res => {
				uni.showToast({
					title: title,
					icon: 'success'
				});
			});
		},

		// 获取用户信息
		getUserInfo() {
			this.$api.getUserInfo(this.userInfo.userId).then(res => {
				if (res.code === this.$code.code_status) {
					this.userDetailInfo = res;
				}
			});
		},

		// 去用户中心
		toUserInfo(id) {
			this.$Router.push({
				name: 'UserInfoDetail',
				params: {
					id
				}
			});
		},

		// 检查更新app
		// #ifdef APP-PLUS
		doUpApp() {
			// 获取当前的app版本
			// let req = {
			// 	appid: plus.runtime.appid,
			// 	version: plus.runtime.version,
			// 	wgtVersion: plus.runtime.getProperty(plus.runtime.appid, wgtInfo => {
			// 		wgtInfo.version;
			// 	})
			// };
			// 请求云函数。拿到版本检测结果
			// callCheckVersion().then(res => {
			// 	if (res.code === 0) {
			// 		uni.showModal({
			// 			title: '暂无更新',
			// 			content: '当前版本已经是最新的，不需要更新'
			// 		});
			// 	} else if (res.code === 102) {
			// 		// 执行更新函数
			// 		upApp();
			// 	} else if (res.code === -101) {
			// 		console.log('暂无更新或检查appid是否填写正确');
			// 	}
			// });
			// 执行更新函数
			upApp();
		},
		// #endif

		// 跳转到登录页面
		toLogin() {
			this.$Router.push({
				name: 'Login'
			});
		},

		// 打开退出弹窗
		toLogout() {
			this.showLogout = true;
		},

		// 确认退出登录
		confirmLogout() {
			this.$api.logout().then(res => {
				if (res.code === this.$code.code_status) {
					this.$Router.replace({
						name: 'Login'
					});
					uni.setStorageSync('token', '');
					uni.setStorageSync('loginState', false);
					// 设置登录状态响应
					this.setLogin();
				}
			});
		},

		// 退出app
		killApp() {
			plus.runtime.quit();
		},

		// 退出登录
		logout() {
			this.showLogout = false;
			this.showLogoutModal = true;
		},

		toBack() {
			uni.navigateBack({
				delta: 1
			});
		},

		// 同步响应用户信息以及登录状态
		...mapMutations('user', { setLoginState: 'LOGIN_STATE', setUserInfo: 'USER_INFO', setLogin: 'LOGIN' })
	}
};
</script>

<style lang="scss" scoped>
.user-setting {
	width: 100%;
	height: 100%;
	padding: 16rpx 20rpx 40rpx 20rpx;
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
		.user-no-login {
			display: flex;
			align-items: center;
			.user-login {
				margin-left: 30rpx;
				font-size: 32rpx;
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
			.u-cell {
				padding: 16rpx;
			}
		}
	}
}
</style>
