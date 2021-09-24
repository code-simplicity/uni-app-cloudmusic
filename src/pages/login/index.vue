<template>
	<view class="login-wrap">
		<view class="login-container">
			<view class="login-title"><text>登录网易云账户</text></view>
			<view class="login-image"><image src="../../static/images/logo.png" mode=""></image></view>
			<view class="login-section-content">
				<view class="login-input" v-show="mode === 'phone'">
					<u-input v-model="phoneNumber" type="type" border="border" placeholder="请输入手机号码" />
				</view>
				<view class="login-input" v-show="mode === 'email'">
					<u-input v-model="email" type="email" border="border" placeholder="请输入邮箱" />
				</view>
				<view class="login-input">
					<u-input
						v-model="password"
						type="password"
						border="border"
						placeholder="请输入密码"
						:password-icon="passwordIcon"
					/>
				</view>
				<view class="login-button"><u-button type="primary" @click="login">登录</u-button></view>
				<view><u-toast ref="uToast" /></view>
			</view>
			<view class="login-other">
				<view class="login-other-mode" @click="mode === 'email'">
					<text class="login-button-text">邮箱登录</text>
				</view>
				<view class="login-other-mode" @click="mode === 'verifyCode'">
					<text class="login-button-text">验证码登录</text>
				</view>
				<view class="login-other-mode" @click="mode === 'email'">
					<text class="login-button-text">手机登录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-23 5:33:19 ?F10: PM?
 * description
 */
import md5 from 'js-md5';
import { mapMutations } from 'vuex';
export default {
	name: '',
	data() {
		return {
			// 手机号
			phoneNumber: '',
			// 邮箱
			email: '',
			// 密码
			password: '',
			// 展示隐藏图标
			passwordIcon: true,
			// 选择模式
			mode: 'phone'
		};
	},
	component: {},
	mounted() {},
	methods: {
		// 登录
		login() {
			if (this.mode === 'phone') {
				let params = {
					phone: this.phoneNumber,
					password: 'fakePassword',
					md5_password: md5(this.password).toString()
				};
				this.$api
					.loginWithPhone(params)
					.then(res => {
						if (res.code === this.$code.code_status) {
							this.getUserInfo(res.profile.userId);
							// 存储cookie
							uni.setStorageSync('cookie', res.cookie);
							// 存储token
							uni.setStorageSync('cookie', res.token);
							// 设置为登录状态
							uni.setStorageSync('loginState', true);
							// 设置登录状态响应
							this.setLoginState(true);
							// 获取用户信息到vuex
							this.setUserInfo(res.profile);
						}
					})
					.catch(error => {
						console.log(error);
					});
			}
		},
		// 获取用户登录信息
		getUserInfo(uid) {
			this.$api.getUserInfo(uid).then(res => {
				if (res.code === this.$code.code_status) {
					let userInfo = res.profile;
					userInfo.level = res.level;
					userInfo.listenSongs = res.listenSongs;
					userInfo.createTime = res.createTime;
					userInfo.createDays = res.createDays;
					uni.setStorageSync('userInfo', JSON.stringify(userInfo));
					this.setUserInfo(res.profile);
					// 登录成功，跳转到首页
					this.$refs.uToast.show({
						title: '登录成功',
						type: 'success'
					});
					// 设置定时器2s跳转到首页
					setTimeout(() => {
						this.$Router.replace({
							name: 'Home'
						});
					}, 2000);
				}
			});
		},
		// 同步响应用户信息以及登录状态
		...mapMutations('user', { setLoginState: 'LOGIN_STATE', setUserInfo: 'USER_INFO' })
	}
};
</script>

<style lang="scss" scoped>
.login-wrap {
	.login-container {
		.login-title {
			margin-top: 40rpx;
			text-align: center;
			font-size: 36rpx;
		}
		.login-image {
			height: 200rpx;
			width: 200rpx;
			margin: 50rpx auto 100rpx auto;
			image {
				height: 200rpx;
				width: 200rpx;
			}
		}
		.login-section-content {
			align-items: center;
			.login-input {
				margin: 0 auto;
				height: 100rpx;
				width: 80%;
			}
			.login-button {
				margin: 0 auto;
				width: 80%;
			}
		}
		.login-other {
			display: flex;
			align-items: center;
			justify-content: center;
			.login-other-mode {
				margin: 0 auto;
				font-size: 30rpx;
				.login-button-text {
					color: #000088;
					&:hover {
						color: #5caa62;
					}
				}
			}
		}
	}
}
</style>
