<template>
	<view class="content">
		<image class="logo" src="/static/images/logo.png"></image>
		<view class="title">
			<text class="title">{{ title }}</text>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-23 5:15:06 ?F10: PM?
 * description
 */
export default {
	name: 'Index',
	data() {
		return {
			title: '欢迎使用my-music',
			timer: null
		};
	},
	component: {},
	mounted() {
		this.timer = setTimeout(() => {
			// 定时器路由到登录
			uni.redirectTo({
				url:'../login/index'
			},1000)
		});
	},
	methods: {
		
	},
	destroyed() {
		// 销毁定时器
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin: 200rpx auto 50rpx auto;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	margin-top: 20rpx;
	font-size: 36rpx;
	color: #000000;
}
</style>
