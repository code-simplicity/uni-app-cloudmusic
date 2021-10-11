<template>
	<view class="play-list">
		<play-list-navbar></play-list-navbar>
		<view class="play-list-box">
			<u-tabs-swiper
				ref="uTabs"
				:list="playList"
				:current="currentTab"
				@change="tabChange"
				:is-scroll="true"
				active-color="#e51419"
				swiperWidth="750"
			></u-tabs-swiper>
		</view>
		<swiper
			class="search-swiper"
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
		></swiper> 
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-9 10:02:04 ?F10: PM?
 * description 歌单
 */

export default {
	name: 'play-list',
	data() {
		return {
			// 选项卡
			playList: [
				{
					type: 1018,
					name: '综合'
				}
			],
			// 选项卡的值
			currentTab: 0,
			// 控制切换选项卡
			swiperCurrent: 0
		};
	},
	component: {},
	mounted() {
		this.getPlayListHot();
	},
	methods: {
		// 获取热门歌单
		getPlayListHot() {
			this.$api.getPlayListHot().then(res => {
				this.playList = res.tags;
			});
		},

		// tabs通知swiper切换
		tabChange(index) {
			this.swiperCurrent = index;
			// this.getCloudSearch(this.searchKeyword, index);
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
			// if (this.currentTab !== current) {
			// 	this.getCloudSearch(this.searchKeyword, current);
			// }
			this.currentTab = current;
		},

		// scroll-view到底部加载更多
		onreachBottom() {
			console.log('没有更多了!');
		}
	}
};
</script>

<style lang="scss" scoped>
.play-list {
	width: 100%;
	.play-list-box {
		width: 100%;
	}
}
</style>
