<template>
	<view class="home-box">
		<!-- 头部固定 -->
		<view class="home-header"><my-search :showUserInfo="showUserInfo"></my-search></view>
		<!-- 中间内容 -->
		<view class="home-content">
			<my-banner></my-banner>
			<view class="home-recommend-day"><recommend-day></recommend-day></view>
			<view class="home-recommend-playlist">
				<recommend-play-list :songlist="songlist"></recommend-play-list>
			</view>
		</view>
		<!-- 左侧弹出菜单 -->
		<view class="home-left">
			<view class="home-user">
				<u-popup v-model="showUserInfo"><view>出淤泥而不染，濯清涟而不妖</view></u-popup>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			showUserInfo: false,
			// 热门歌单
			songlist: []
		};
	},
	component: {},

	mounted() {
		this.getRecommendResource()
	},

	methods: {
		// 获取推荐歌单
		getRecommendResource() {
			this.$api
				.getRecommendResource()
				.then(res => {
					if (res.code === this.$code.code_status) {
						this.songlist = res.recommend;
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.home-box {
	display: flex;
	.home-header {
		width: 100%;
		position: fixed;
		padding: 0 10rpx;
		top: 10rpx;
		left: 0;
		right: 0;
		z-index: 9999;
	}
	.home-content {
		padding: 0 10rpx;
		width: 100%;
		flex-direction: column;
		margin-top: 100rpx;
		align-items: center;
		flex-wrap: wrap;
		.home-recommend-day {
			margin-top: 220rpx;
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 16rpx;
		}
		.home-recommend-playlist {
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
