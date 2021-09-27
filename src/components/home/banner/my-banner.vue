<template>
	<view class="my-banner">
		<u-swiper
			:list="bannerList"
			:interval="4000"
			name="pic"
			:current="current"
		></u-swiper>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-25 9:25:32 ?F10: AM?
 * description
 */

export default {
	name: 'my-banner',
	data() {
		return {
			bannerList: [],
			// 获取轮播图类型,1为安卓
			type: 1,
			current: 0
		};
	},
	component: {},
	mounted() {
		this.getBanner();
	},
	methods: {
		// 获取轮播图
		getBanner() {
			this.$api.getBanner(this.type).then(res => {
				if (res.code === this.$code.code_status) {
					this.bannerList = res.banners;
				}
				this.setData({
					bannerList:  res.banners
				})
			});
		},
		// checkBanner() {
		// 	this.setData({
		// 	        "current"：0
		// 	    })
		// }
	}
};
</script>

<style lang="scss" scoped>
.my-banner {
	width: 100%;
	height: 50rpx;
	margin-bottom: 20rpx;
}
</style>
