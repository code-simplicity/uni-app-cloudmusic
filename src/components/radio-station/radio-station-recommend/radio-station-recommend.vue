<template>
	<view class="radio-station-recommend">
		<view class="search-top">
			<u-search
				placeholder="搜索内容"
				v-model="searchKeyword"
				shape="round"
				bg-color="#d8d8d8"
				:clearabled="true"
				:show-action="false"
				@click="toSearch"
				@focus="toSearch"
			></u-search>
		</view>
		<view class="my-banner">
			<u-swiper
				:list="bannerList"
				mode="rect"
				:circular="true"
				height="260"
				interval="5000"
				:current="current"
				name="pic"
				:title="true"
			></u-swiper>
		</view>
		<view class="radio-category-recommend">
			<u-grid :col="4">
				<u-grid-item v-for="(item, index) in categoryRecommendList" :key="index" :custom-style="customStyle">
					<u-icon :name="categoryIcon[index]" :size="50" color="#ff0e06"></u-icon>
					<view class="grid-text">{{ item.categoryName }}</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="radio-list">
			<radio-station-list :radioRecommendList="emotionRecommend"></radio-station-list>
			<radio-station-list :radioRecommendList="musicRecommend"></radio-station-list>
			<radio-station-list :radioRecommendList="secondRecommend"></radio-station-list>
			<radio-station-list :radioRecommendList="soundRecommend"></radio-station-list>
			<radio-station-list :radioRecommendList="sayRecommend"></radio-station-list>
			<radio-station-list :radioRecommendList="talkRecommend"></radio-station-list>
			<radio-station-list :radioRecommendList="creationRecommend"></radio-station-list>
			<radio-station-list :radioRecommendList="electronicRecommend"></radio-station-list>
			<radio-station-list :radioRecommendList="lifeRecommend"></radio-station-list>
			<radio-station-list :radioRecommendList="starRecommend"></radio-station-list>
			<radio-station-list :radioRecommendList="childRecommend"></radio-station-list>
			<radio-station-list :radioRecommendList="knowledgeRecommend"></radio-station-list>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-15 10:10:46 ?F10: AM?
 * description 推荐
 */

export default {
	name: 'radio-station-recommend',
	data() {
		return {
			// 搜索
			searchKeyword: '',
			// 轮播图
			bannerList: [],
			// 初始化显示第几项
			current: 0,
			// 获取推荐电台类型
			categoryRecommendList: [],
			// 图标
			categoryIcon: [
				'grid',
				'kefu-ermai',
				'minus-circle',
				'server-man',
				'coupon',
				'mic',
				'hourglass',
				'pause-circle',
				'car',
				'minus-people-fill',
				'account',
				'integral'
			],
			// 自定义
			customStyle: {
				padding: '16rpx'
			},
			// 情感推荐
			emotionRecommend: {},
			// 音乐推荐
			musicRecommend: {},
			// 二次元
			secondRecommend: {},
			// 有声书
			soundRecommend: {},
			// 脱口秀
			sayRecommend: {},
			// 侃侃而谈
			talkRecommend: {},
			// 创作翻唱
			creationRecommend: {},
			// 电音
			electronicRecommend: {},
			// 生活
			lifeRecommend: {},
			// 明星专区
			starRecommend: {},
			// 亲子
			childRecommend: {},
			// 知识
			knowledgeRecommend: {}
		};
	},
	component: {},
	mounted() {
		this.getDjBanner();
		this.getDjCategoryRecommend();
	},
	methods: {
		// 获取推荐电台类型
		getDjCategoryRecommend() {
			this.$api.getDjCategoryRecommend().then(res => {
				if (res.code === this.$code.code_status) {
					this.categoryRecommendList = res.data;
					// 获取推荐内容
					this.emotionRecommend = res.data[0];
					this.musicRecommend = res.data[1];
					this.secondRecommend = res.data[2];
					this.soundRecommend = res.data[3];
					this.sayRecommend = res.data[4];
					this.talkRecommend = res.data[5];
					this.creationRecommend = res.data[6];
					this.electronicRecommend = res.data[7];
					this.lifeRecommend = res.data[8];
					this.starRecommend = res.data[9];
					this.childRecommend = res.data[10];
					this.knowledgeRecommend = res.data[11];
				}
			});
		},

		// 获取轮播图
		getDjBanner() {
			this.$api.getDjBanner().then(res => {
				if (res.code === this.$code.code_status) {
					this.bannerList = res.data;
				}
			});
		},

		// 跳转搜索页
		toSearch() {
			this.$Router.push({
				name: 'Search'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.radio-station-recommend {
	width: 100%;
	height: 100%;
	padding: 26rpx 16rpx;
	.search-top {
	}
	.my-banner {
		margin: 20rpx 0;
	}
	.radio-category-recommend {
		.grid-text {
			font-size: 24rpx;
		}
	}
	.radio-list {
		margin-top: 16rpx;
	}
}
</style>
