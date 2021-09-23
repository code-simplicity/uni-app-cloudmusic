<template>
	<view class="content">
		<image class="logo" src="/static/images/logo.png"></image>
		<view class="title">
			<text class="title">{{ result }}</text>
		</view>
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
		<view>
			<u-field v-model="mobile" label="手机号" placeholder="请填写手机号"></u-field>
			<u-field v-model="code" label="验证码" placeholder="请填写验证码"></u-field>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-23 5:15:06 ?F10: PM?
 * description
 */
import { getPlaylistCatlist } from '../../api/service/user.js';
export default {
	name: 'Lndex',
	data() {
		return {
			title: 'Hello',
			result: {},
			uid: '5145505596',
			list: [
				{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				},
				{
					text: '分享'
				},
				{
					text: '评论'
				}
			],
			show: true,
			mobile: '',
			code: ''
		};
	},
	component: {},
	mounted() {
		this.getPlaylistCatlist();
	},
	methods: {
		// 获取用户歌单
		getPlaylistCatlist() {
			getPlaylistCatlist().then(res => {
				if (res.code === 200) {
					this.result = res.categories;
					console.log('res', this.result);
				}
			});
		}
	}
};
</script>

<style scoped>
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
	font-size: 36rpx;
	color: #000000;
}
</style>
