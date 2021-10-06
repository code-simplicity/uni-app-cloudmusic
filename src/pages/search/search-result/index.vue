<template>
	<view class="search-result">
		<view class="search-header">
			<u-navbar>
				<u-search
					:placeholder="searchDefault"
					v-model="searchKeyword"
					:show-action="true"
					action-text="搜索"
					:focus="true"
					:clearabled="true"
					:animation="true"
					margin="0 20rpx 0 0"
					@search="search"
					@custom="search"
					@change="change"
				></u-search>
			</u-navbar>
		</view>

		<view class="search-wrap">
			<u-tabs-swiper
				ref="uTabs"
				:list="searchList"
				:current="currentTab"
				@change="tabChange"
				:is-scroll="true"
				active-color="#e51419"
				swiperWidth="750"
			></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom"></scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-6 9:04:28 ?F10: AM?
 * description
 */

export default {
	name: 'search-result',
	data() {
		return {
			// 搜索关键字
			searchKeyword: '',
			// 输入框默认搜索
			searchDefault: '',
			// 选项卡
			searchList: [
				{
					type: 1018,
					name: '综合'
				},
				{
					type: 1,
					name: '单曲'
				},
				{
					type: 1000,
					name: '歌单'
				},
				{
					type: 1014,
					name: '视频'
				},
				{
					type: 100,
					name: '歌手'
				},
				{
					type: 1006,
					name: '歌词'
				},
				{
					type: 10,
					name: '专辑'
				},
				{
					type: 1002,
					name: '用户'
				}
			],
			// 选项卡的值
			currentTab: 0,
			// 控制切换选项卡
			swiperCurrent: 0
		};
	},
	component: {},
	mounted() {},
	methods: {
		// tabs通知swiper切换
		tabChange(index) {
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
			this.currentTab = current;
		}
	}
};
</script>

<style lang="scss" scoped>
.search-result {
	width: 100%;
	.search-header {
		width: 100%;
	}
	.search-wrap {
		margin-top: 10rpx;
		width: 100%;
	}
}
</style>
