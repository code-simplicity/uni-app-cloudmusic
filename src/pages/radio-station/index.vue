<template>
	<view class="radio-station">
		<view class="radio-station-top">
			<u-navbar :is-back="false" title="">
				<user-setting></user-setting>
				<view class="u-tabs">
					<u-tabs-swiper
						active-color="#ff0004"
						inactive-color="#000000"
						:is-scroll="false"
						:current="currentIndex"
						@change="changeTabs"
						ref="uTabs"
						:list="listTabs"
					></u-tabs-swiper>
				</view>
				<view slot="right" class="right-add">
					<u-icon name="plus-circle-fill" size="56" color="#ff0004" @click="toSearch"></u-icon>
				</view>
			</u-navbar>
		</view>
		<swiper
			class="search-swiper"
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
		>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 100%;" @scrolltolower="onreachBottom">
					<radio-station-recommend></radio-station-recommend>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 100%;" @scrolltolower="onreachBottom"></scroll-view>
			</swiper-item>
		</swiper>
		<!-- 底部播放器 -->
		<music-player></music-player>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-24 9:32:38 ?F10: PM?
 * description
 */

export default {
	name: 'radio-station',
	data() {
		return {
			listTabs: [
				{
					name: '推荐'
				},
				{
					name: '分类'
				},
				{
					name: '听听'
				}
			],
			currentIndex: 0,
			// 控制切换选项卡
			swiperCurrent: 0
		};
	},
	component: {},
	mounted() {},
	methods: {
		// 切换tabs
		changeTabs(index) {
			this.swiperCurrent = index;
			console.log(index);
		},

		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},

		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.currentIndex = current;
		},

		// scroll-view到底部加载更多
		onreachBottom() {
			console.log('没有更多了!');
		}
	}
};
</script>

<style lang="scss" scoped>
.radio-station {
	width: 100%;
	.radio-station-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.u-tabs {
			flex: 1;
		}
		.right-add {
			margin-right: 10rpx;
		}
	}
	.search-swiper {
		flex: 1;
		height: 1400rpx;
		.swiper-item {
			height: 100%;
		}
	}
}
</style>
