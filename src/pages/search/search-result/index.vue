<template>
	<view class="search-result">
		<view class="search-header">
			<u-navbar>
				<search-bar ref="searchBar" @search="onSearch" @custom="onSearch" @change="change"></search-bar>
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
		<swiper
			class="search-swiper"
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
		>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 100%;" @scrolltolower="onreachBottom">
					<search-multiple ref="searchMultiple"></search-multiple>
				</scroll-view>
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

	onLoad() {
		// 放入这个生命周期中，当外部点击搜索之后，在直接显示出搜索结果
		let searchKeyword = this.$Route.query.searchKeyword;
		if (searchKeyword) {
			this.searchKeyword = searchKeyword;
		}
	},

	onReady() {
		this.getCloudSearch(this.searchKeyword, this.swiperCurrent);
	},

	created() {},

	mounted() {
		this.$refs.searchBar.setKeyword(this.searchKeyword);
	},

	methods: {
		// 值改变之后出现搜索建议的框
		change() {},
		// 执行搜索
		onSearch(keyword) {
			if (!keyword) {
				return;
			}
			this.searchKeyword = keyword;
			this.$refs.searchBar.setKeyword(keyword);
			// 执行搜索，传入关键字以及tabs切换的值
			this.getCloudSearch(keyword, this.swiperCurrent);
		},

		/**
		 * 搜索
		 * type: 搜索类型；取值意义 : 1: 单曲,
		 * 10: 专辑, 100: 歌手,
		 * 1000: 歌单, 1002: 用户,
		 * 1004: MV, 1006: 歌词,
		 *  1009: 电台, 1014: 视频, 1018:综合
		 */
		getCloudSearch(keyword, index) {
			if (!keyword) {
				return;
			}
			// 综合,传递输入框关键字给子组件
			switch (index) {
				case 0: {
					this.$refs.searchMultiple.getSearchMultimatch(keyword);
					break;
				}
				case 1: {
					this.$refs.searchMultiple.getSearchMultimatch(keyword);
					break;
				}
				case 2: {
					this.$refs.searchMultiple.getSearchMultimatch(keyword);
					break;
				}
				case 3: {
					this.$refs.searchMultiple.getSearchMultimatch(keyword);
					break;
				}
				case 4: {
					this.$refs.searchMultiple.getSearchMultimatch(keyword);
					break;
				}
				case 5: {
					this.$refs.searchMultiple.getSearchMultimatch(keyword);
					break;
				}
				case 6: {
					this.$refs.searchMultiple.getSearchMultimatch(keyword);
					break;
				}
				case 7: {
					this.$refs.searchMultiple.getSearchMultimatch(keyword);
					break;
				}
			}
		},

		// tabs通知swiper切换
		tabChange(index) {
			this.swiperCurrent = index;
			console.log(index);
			this.getCloudSearch(this.searchKeyword, index);
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
			if (this.currentTab !== current) {
				this.getCloudSearch(this.searchKeyword, current);
			}
			this.currentTab = current;
		}
	}
};
</script>

<style lang="scss" scoped>
.search-result {
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	position: absolute;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;

	.search-header {
		width: 100%;
	}
	.search-wrap {
		margin-top: 10rpx;
		width: 100%;
	}
	.search-swiper {
		flex: 1;
	}
}
</style>
