<template>
	<view class="content">
		<image class="logo" src="/static/images/logo.png"></image>
		<view>
			<text class="title">{{ result }}</text>
		</view>
	</view>
</template>

<script>
import { getPlaylistCatlist } from '../../api/service/user.js';

export default {
	data() {
		return {
			title: 'Hello',
			result: {},
			uid: '5145505596'
		};
	},
	onLoad() {

	},
	mounted() {
		this.getPlaylistCatlist()
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

<style  scoped>
	/* // @import url('../../static/style/variable.less') */
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
	/* color: @color-bar; */
}
</style>
